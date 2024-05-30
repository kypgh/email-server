import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_accountKYCVerifiedEmailData from "emails/TIO_accountKYCVerifiedEmailData";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import {
  TIO_DOWNLOAD_PLATFORM_PAGE,
  TIO_MA_DEPOSITS_PAGE,
  TIO_MA_OPEN_LIVE_ACCOUNT_PAGE,
} from "config/urls";

const TioVerifyAccountKYCSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  registrationDate: zod.string(),
  companyName: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = TioVerifyAccountKYCSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  const formattedDate = DateTime.fromISO(values.registrationDate).toFormat(
    "LLL dd, yyyy",
    { locale: values.locale }
  );

  let subject = `${data.tioAccountKYCVerify.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    deposits_funds_url: TIO_MA_DEPOSITS_PAGE,
    download_platform_url: TIO_DOWNLOAD_PLATFORM_PAGE,
    open_live_account_url: TIO_MA_OPEN_LIVE_ACCOUNT_PAGE,
    company_name: values.companyName,
    registered_date: formattedDate,
    locale: values.locale,
    support_email: "support@tiomarkets.com",
  };

  await sendEmail(
    TIO_accountKYCVerifiedEmailData({
      params,
      content: data.tioAccountKYCVerify,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

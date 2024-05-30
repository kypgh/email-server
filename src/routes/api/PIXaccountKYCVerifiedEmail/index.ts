import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import PIX_accountKYCVerifiedEmailData from "emails/PIX_accountKYCVerifiedEmailData";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import {
  PIX_MA_OPEN_LIVE_ACCOUNT_PAGE,
  PIX_MA_DEPOSITS_PAGE,
} from "config/urls";

const PixVerifyAccountKYCSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = PixVerifyAccountKYCSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });
  let subject = `${data.pixAccountKYCVerify.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    deposit_funds_url: PIX_MA_DEPOSITS_PAGE,
    open_live_account_url: PIX_MA_OPEN_LIVE_ACCOUNT_PAGE,
    company_name: "PrimeIndex",
    locale: values.locale,
  };

  await sendEmail(
    PIX_accountKYCVerifiedEmailData({
      params,
      content: data.pixAccountKYCVerify,
      footer: data.PIXRiskDisclaimer,
    }),
    TIO_BRANDS.PIX,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

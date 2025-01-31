import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_emaiLVerifyData from "emails/TIO_emailVerifyData";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import { TIO_MA_VERIFY_EMAIL_PAGE } from "config/urls";

const validationSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  emailToken: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = validationSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.tioEmailVerify.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    company_name: "Tiomarkets",
    locale: values.locale,
    verification_url: TIO_MA_VERIFY_EMAIL_PAGE(values.emailToken),
    support_email: "support@tiomarkets.com",
  };

  await sendEmail(
    TIO_emaiLVerifyData({
      params,
      content: data.tioEmailVerify,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

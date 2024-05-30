import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import PIX_emailVerifyData from "emails/PIX_emailVerifyEmailData";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import { PIX_MA_VERIFY_EMAIL_PAGE } from "config/urls";

const PixVerifyEmailSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  emailToken: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = PixVerifyEmailSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.pixEmailVerify.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    support_email: "support@primeindex.com",
    email_verification_url: PIX_MA_VERIFY_EMAIL_PAGE(values.emailToken),
    company_name: "PrimeIndex",
    locale: values.locale,
  };

  await sendEmail(
    PIX_emailVerifyData({
      params,
      content: data.pixEmailVerify,
      footer: data.PIXRiskDisclaimer,
    }),
    TIO_BRANDS.PIX,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

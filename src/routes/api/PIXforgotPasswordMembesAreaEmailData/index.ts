import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import PIX_forgotPasswordMembesAreaEmailData from "emails/PIX_forgotPasswordMembersAreaEmailData";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import { PIX_MA_RESET_PASSWORD_PAGE } from "config/urls";

const PixFForgotPasswordSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  resetPasswordToken: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = PixFForgotPasswordSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.pixForgotPasswordMembersAreaEmail.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    support_email: "support@primeindex.com",
    reset_password_link: PIX_MA_RESET_PASSWORD_PAGE(values.resetPasswordToken),
    company_name: "PrimeIndex",
    locale: values.locale,
  };

  await sendEmail(
    PIX_forgotPasswordMembesAreaEmailData({
      params,
      content: data.pixForgotPasswordMembersAreaEmail,
      footer: data.PIXRiskDisclaimer,
    }),
    TIO_BRANDS.PIX,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

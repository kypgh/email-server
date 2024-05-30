import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_forgotPasswordMembersArea from "emails/TIO_forgotPasswordMembersArea";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";
import { TIO_MA_RESET_PASSWORD_PAGE } from "config/urls";

const validationSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  resetPasswordToken: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = validationSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.tioForgotPasswordMt5.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    company_name: "Tiomarkets",
    locale: values.locale,
    support_email: "support@tiomarkets.com",
    reset_password_link: TIO_MA_RESET_PASSWORD_PAGE(values.resetPasswordToken),
  };

  await sendEmail(
    TIO_forgotPasswordMembersArea({
      params,
      content: data.tioForgotPasswordMembersArea,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

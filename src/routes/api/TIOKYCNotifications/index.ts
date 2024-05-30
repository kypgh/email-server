import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_KYCNotifications from "emails/TIO_KYCNotifications";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";

const validationSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  days: zod.number(),
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
    days: values.days,
  };

  await sendEmail(
    TIO_KYCNotifications({
      params,
      content: data.tioKYCNotifications,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

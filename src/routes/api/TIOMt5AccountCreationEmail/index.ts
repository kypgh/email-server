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
  account_number: zod.string(),
  password: zod.string(),
  account_type: zod.string(),
  currency: zod.string(),
  leverage: zod.string(),
  platform: zod.string(),
  server: zod.string(),
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
    account_number: values.account_number,
    password: values.password,
    account_type: values.account_type,
    currency: values.currency,
    leverage: values.leverage,
    platform: values.platform,
    server: values.server,
  };

  await sendEmail(
    TIO_KYCNotifications({
      params,
      content: data.tioMt5AccountCreationEmailData,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

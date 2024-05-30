import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_RequestAcknowledgedEmail from "emails/TIO_requestAcknowledgedEmail";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";

const validationSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  request_type: zod.string(),
  request_text: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = validationSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `(${values.request_type}) ${data.tioRequestAcknowledgedEmail.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    company_name: "Tiomarkets",
    locale: values.locale,
    support_email: "support@tiomarkets.com",
    request_type: values.request_type,
    request_text: values.request_text,
  };

  await sendEmail(
    TIO_RequestAcknowledgedEmail({
      params,
      content: data.tioRequestAcknowledgedEmail,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

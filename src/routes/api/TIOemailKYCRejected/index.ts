import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_emailKYCRejected from "emails/TIO_emailKYCRejected";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";

const TioemailKYCRejectSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = TioemailKYCRejectSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.tioEmailKYCRejected.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    company_name: "Tiomarkets",
    locale: values.locale,
    support_email: "support@tiomarkets.com",
  };

  await sendEmail(
    TIO_emailKYCRejected({
      params,
      content: data.tioEmailKYCRejected,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};
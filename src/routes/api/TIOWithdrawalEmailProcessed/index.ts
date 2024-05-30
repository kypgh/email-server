import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";
import TIO_WithdrawalEmailProcessed from "emails/TIO_WithdrawalEmailProcessed";
import { sendEmail } from "services/sengrid.service";
import { TIO_BRANDS } from "config/enums";
import { DateTime } from "luxon";
import languageData from "lang/languageConfig";

const validationSchema = zod.object({
  fullName: zod.string(),
  locale: zod.string(),
  email: zod.string().email(),
  amount: zod.number(),
  currency: zod.string(),
  account_login: zod.string(),
});

export const GET: RouteHandler = async (req, res) => {
  const values = validationSchema.parse(req.body);

  let data = languageData(values.locale);
  const timeNow = DateTime.now().toFormat("LLL dd, HH:mm", {
    locale: values.locale,
  });

  let subject = `${data.tioWithdrawEmailProcessed.subject} (${timeNow})`;

  let params = {
    full_name: values.fullName,
    company_name: "Tiomarkets",
    locale: values.locale,
    support_email: "support@tiomarkets.com",
    amount: values.amount,
    currency: values.currency,
    account_login: values.account_login,
  };

  await sendEmail(
    TIO_WithdrawalEmailProcessed({
      params,
      content: data.tioWithdrawEmailProcessed,
      footer: data.tioRiskDisclaimer,
    }),
    TIO_BRANDS.TIO,
    subject,
    values.email
  );

  res.status(200).json({ message: "Email sent" });
};

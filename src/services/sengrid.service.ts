import { SENDGRID_API_KEY } from "config/env";
import sengrid from "@sendgrid/mail";
import { HTTPError } from "utils/HTTPError";
import { render } from "@react-email/render";

let sengridApiKey: string;

const tioFrom = {
  email: "info@tiomarkets.com",
  name: "TIOmarkets",
};

const pixFrom = {
  email: "info@primeindex.com",
  name: "PrimeIndex",
};

if (typeof SENDGRID_API_KEY !== "undefined") {
  sengridApiKey = SENDGRID_API_KEY;
}

export const sendEmail = async (
  emailData: React.ReactElement<any>,
  brand: string,
  subject: string,
  to: string
) => {
  if (typeof sengridApiKey === "undefined") {
    throw new HTTPError("SENDGRID_API_KEY not set", 404);
  }

  sengrid.setApiKey(sengridApiKey);

  const emailHtml = render(emailData);

  const options = {
    from: brand === "PIX" ? pixFrom.email : tioFrom.email,
    to: !!to ? to : "",
    subject,
    html: emailHtml,
  };

  await sengrid.send(options);
};

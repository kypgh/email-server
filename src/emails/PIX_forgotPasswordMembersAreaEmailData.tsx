import {
  Html,
  Container,
  Text,
  Section,
  Row,
  Column,
  Link,
} from "@react-email/components";
import * as React from "react";
import Footer from "./layouts/PIX/Footer";
import Header from "./layouts/PIX/Header";
import languageData from "lang/languageConfig";
import { DateTime } from "luxon";
import { PIX_MA_RESET_PASSWORD_PAGE } from "config/urls";

interface EmailParams {
  full_name?: string;
  support_email?: string;
  reset_password_link?: string;
  company_name?: string;
  locale?: string;
  year?: string;
}

export default function forgotPassword({
  params: {
    full_name = "John Doe",
    support_email = "support@primeindex.com",
    reset_password_link = PIX_MA_RESET_PASSWORD_PAGE("resetPasswordToken"),
    company_name = "PrimeIndex",
    year = DateTime.now().toFormat("yyyy"),
    locale = "en",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").pixForgotPasswordMembersAreaEmail;

  footer = !!Object.keys(footer).length
    ? footer
    : languageData("en").PIXRiskDisclaimer;

  return (
    <Html
      lang={locale}
      style={{
        width: "100%",
        fontFamily: "Open Sans, sans-serif",
      }}
    >
      <Container>
        <Header />
        <Section
          style={{
            color: "#ffffff",
            background: "#000000",
            padding: "20px",
            fontSize: "16px",
          }}
        >
          <Row>
            <Column>
              <Text>
                {content.title} {full_name},
              </Text>
              <Text>{content.body1}</Text>
              <Link href={reset_password_link}>{content.body2}</Link>
              <Text>{content.body3}</Text>
              <Link href={support_email}>{support_email}</Link>
              <Text>{content.closing}</Text>
              <Text>{company_name}</Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

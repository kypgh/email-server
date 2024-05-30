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
import Footer from "./layouts/TIO/Footer";
import Header from "./layouts/TIO/Header";
import languageData from "lang/languageConfig";
import { DateTime } from "luxon";

interface EmailParams {
  full_name?: string;
  locale?: string;
  year?: string;
  company_name?: string;
  support_email?: string;
  account_number: string;
  new_password: string;
  platform: string;
  server: string;
}

export default function forgotMt5AccountPassword({
  params: {
    full_name = "John Doe",
    locale = "en",
    year = DateTime.now().toFormat("yyyy"),
    company_name = "Tiomarkets",
    support_email = "support@tiomarkets.com",
    account_number = "1234567",
    new_password = "password",
    platform = "MT5",
    server = "TIOMarkets-Demo",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").tioForgotPasswordMt5;

  footer = !!Object.keys(footer).length
    ? footer
    : languageData("en").tioRiskDisclaimer;

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
            color: "#000000",
            background: "#f1f1f1",
            padding: "20px",
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          <Row>
            <Column>
              <Text>
                <b>{content.intro}</b>
              </Text>
              <Text>
                {content.title} {full_name},
              </Text>
              <Text>
                {content.body1} <b>{account_number}</b> {content.body2}
              </Text>
              <Text>
                {content.body3} <b>{new_password}</b>
              </Text>
              <Text>
                {content.body4} <b>{account_number}</b>
              </Text>
              <Text>
                {content.body5} <b>{platform}</b> {content.body6}
                <b>{server}</b>
              </Text>
              <Text>{content.body7}</Text>
              <Link href={support_email}>{support_email}</Link>
              <Text>{content.closing}</Text>
              <Text>
                <b>{company_name}</b>
              </Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

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
import { TIO_MA_RESET_PASSWORD_PAGE } from "config/urls";

interface EmailParams {
  full_name?: string;
  locale?: string;
  year?: string;
  company_name?: string;
  account_number?: string;
  password?: string;
  account_type?: string;
  currency?: string;
  leverage?: string;
  platform?: string;
  server?: string;
}

export default function mt5AccountEmailCreation({
  params: {
    full_name = "John Doe",
    locale = "en",
    year = DateTime.now().toFormat("yyyy"),
    company_name = "Tiomarkets",
    account_number = "1234567",
    password = "password",
    account_type = "Standard",
    currency = "USD",
    leverage = "",
    platform = "MT5",
    server = "TIOMarkets-Demo",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").tioMt5AccountCreationEmailData;

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
              <Text>{content.body1}</Text>
              <Text>{content.body2}</Text>
              <Text>
                {content.body3} <b>{account_number}</b>
              </Text>
              <Text>
                {content.body4} <b>{password}</b>
              </Text>
              <Text>
                <b>{content.body5}</b>
              </Text>
              <Text>
                <b>{company_name}</b> {content.closing}
              </Text>
              <Text>
                <b>
                  {content.body6}
                  {account_type}
                </b>
              </Text>
              <Text>
                <b>
                  {content.body7}
                  {currency}
                </b>
              </Text>
              <Text>
                <b>{leverage ? content.body8 + leverage : ""}</b>
                {/* <b>
                  {content.body8}
                  {leverage}
                </b> */}
              </Text>
              <Text>
                <b>
                  {content.body9}
                  {platform}
                </b>
              </Text>
              <Text>
                <b>
                  {content.body10}
                  {server}
                </b>
              </Text>
              <Text>
                {content.closing1} <b>{company_name}</b> {content.closing2}
              </Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

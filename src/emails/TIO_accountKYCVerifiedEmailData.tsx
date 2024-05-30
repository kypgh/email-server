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
import {
  TIO_DOWNLOAD_PLATFORM_PAGE,
  TIO_MA_DEPOSITS_PAGE,
  TIO_MA_OPEN_LIVE_ACCOUNT_PAGE,
} from "config/urls";

interface EmailParams {
  full_name?: string;
  support_email?: string;
  company_name?: string;
  locale?: string;
  year?: string;
  registered_date?: string;
  download_platform_url?: string;
  deposits_funds_url?: string;
  open_live_account_url?: string;
}

export default function createAccountKYCVerifiedNotificationEmailData({
  params: {
    full_name = "John Doe",
    support_email = "support@tiomarkets.com",
    registered_date = DateTime.now().toFormat("LLL dd, yyyy"),
    company_name = "Tiomarkets",
    year = DateTime.now().toFormat("yyyy"),
    locale = "en",
    download_platform_url = TIO_DOWNLOAD_PLATFORM_PAGE,
    deposits_funds_url = TIO_MA_DEPOSITS_PAGE,
    open_live_account_url = TIO_MA_OPEN_LIVE_ACCOUNT_PAGE,
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").tioAccountKYCVerify;

  footer = !!Object.keys(footer).length
    ? footer
    : languageData("en").tioRiskDisclaimer;

  let closing =
    company_name === "Tiomarkets"
      ? `${content.closing1} ${company_name} ${content.closing2}`
      : `${content.closing_tioeu} ${company_name}`;

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
                {content.title} {full_name},
              </Text>
              <Text>{content.body1}</Text>
              <Text>{content.body2}</Text>
              <Text>{content.body3}</Text>
              <Text>
                <ul>
                  <li>
                    <Link href={deposits_funds_url}>{content.body4}</Link>
                  </li>
                  <li>
                    <Link href={open_live_account_url}>{content.body5}</Link>
                  </li>
                  <li>
                    {content.body6}{" "}
                    <Link href={download_platform_url}>{content.body7}</Link>
                  </li>
                </ul>
              </Text>
              <Text>
                {content.body8} <b>{registered_date}</b> {content.body9}{" "}
                {company_name} {content.body10}
              </Text>
              <Text>{content.body11}</Text>
              <Text>{content.body12}</Text>
              <Text>{content.body13}</Text>
              <Link href={support_email}>{support_email}</Link>
              <Text>{content.body14}</Text>
              <Text>{content.body15}</Text>
              <Text>{content.body16}</Text>
              <Text>{closing}</Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

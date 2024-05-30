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
import {
  PIX_MA_OPEN_LIVE_ACCOUNT_PAGE,
  PIX_MA_DEPOSITS_PAGE,
} from "config/urls";

interface EmailParams {
  full_name?: string;
  deposit_funds_url?: string;
  open_live_account_url?: string;
  company_name?: string;
  year?: string;
  locale?: string;
}

export default function createAccountKYCVerifiedNotificationEmailData({
  params: {
    full_name = "John Doe",
    deposit_funds_url = PIX_MA_DEPOSITS_PAGE,
    open_live_account_url = PIX_MA_OPEN_LIVE_ACCOUNT_PAGE,
    company_name = "PrimeIndex",
    year = DateTime.now().toFormat("yyyy"),
    locale = "en",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").pixAccountKYCVerify;

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
              <Text>{content.body2}</Text>
              <Text>{content.body3}</Text>
              <Text>
                <ul>
                  <li>
                    <Link href={deposit_funds_url}>{content.depositLink}</Link>
                  </li>
                  <li>
                    <Link href={open_live_account_url}>
                      {content.openAccountLink}
                    </Link>
                  </li>
                </ul>
              </Text>
              <Text>
                <Text
                  style={{
                    margin: "0px",
                  }}
                >
                  {company_name}
                </Text>
                <Text
                  style={{
                    margin: "0px",
                  }}
                >
                  {content.closing}
                </Text>
              </Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

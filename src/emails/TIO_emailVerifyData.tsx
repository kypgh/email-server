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
import { TIO_MA_VERIFY_EMAIL_PAGE } from "config/urls";

interface EmailParams {
  full_name?: string;
  locale?: string;
  year?: string;
  company_name?: string;
  verification_url?: string;
  support_email?: string;
}

export default function emailVerify({
  params: {
    full_name = "John Doe",
    locale = "en",
    year = DateTime.now().toFormat("yyyy"),
    verification_url = TIO_MA_VERIFY_EMAIL_PAGE("verifyEmailToken"),
    company_name = "Tiomarkets",
    support_email = "support@tiomarkets.com",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").tioEmailVerify;

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
              <Link href={verification_url}>Click Here</Link>
              <Text>{content.body3}</Text>
              <Link href={support_email}>{support_email}</Link>
              <Text>{content.closing1}</Text>
              <Text>
                <b>{company_name}</b>
              </Text>
              <Text>{content.closing2}</Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

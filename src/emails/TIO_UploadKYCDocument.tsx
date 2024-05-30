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
}

export default function requestApproveEmail({
  params: {
    full_name = "John Doe",
    locale = "en",
    year = DateTime.now().toFormat("yyyy"),
    company_name = "Tiomarkets",
  } = {} as EmailParams,
  content = {} as any,
  footer = {} as any,
} = {}) {
  content = !!Object.keys(content).length
    ? content
    : languageData("en").tioUploadKYCDocument;

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
              <Text>
                <b>{company_name}</b> {content.closing}
              </Text>
            </Column>
          </Row>
        </Section>
        <Footer content={footer} year={year} />
      </Container>
    </Html>
  );
}

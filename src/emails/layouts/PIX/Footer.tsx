import { Section, Text, Row, Column } from "@react-email/components";
import React from "react";

const Footer = ({ year, content }: { year: string; content: any }) => {
  return (
    <Section
      style={{
        background: "#000000",
        borderRadius: "0px 0px 10px 10px",
      }}
    >
      <Row width={"100%"}>
        <Column
          style={{
            width: "100%",
            border: "1px solid #a317e9",
          }}
        ></Column>
      </Row>
      <Row>
        <Column
          style={{
            padding: "20px",
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              color: "#434651",
              textAlignLast: "left",
              fontFamily: "Open Sans, sans-serif",
            }}
          >
            <b>{content.risk_disclaimer_title}</b>{" "}
            {content.risk_disclaimer_body1}
          </Text>
          <Text
            style={{
              fontFamily: "Open Sans, sans-serif",
              textAlign: "justify",
              color: "#434651",
              textAlignLast: "left",
            }}
          >
            {content.risk_disclaimer_body2}
          </Text>
          <Text
            style={{
              fontFamily: "Open Sans, sans-serif",
              textAlign: "justify",
              color: "#434651",
              textAlignLast: "left",
            }}
          >
            {content.risk_disclaimer_body3} @{year} {content.copyright}
          </Text>
        </Column>
      </Row>
    </Section>
  );
};

export default Footer;

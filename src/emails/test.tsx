import {
  Button,
  Html,
  Img,
  Container,
  Row,
  Column,
  Text,
  Section,
} from "@react-email/components";
import * as React from "react";

export default function HelloEmail() {
  return (
    <Html
      style={{
        width: "100%",
      }}
    >
      <Container
        style={{
          width: "100%",
          background: "#000000",
          padding: "20px",
          textAlign: "center",
          fontSize: "16px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Row>
          <Column align="center">
            <Img
              alt="Example"
              src="http://localhost:3001/images/finalPrimeLogo.png"
              width={249}
              height={24}
            />
          </Column>
        </Row>
        <Section
          style={{
            color: "#ffffff",
            fontFamily: "Open Sans', sans-serif",
          }}
        >
          <Text>Good news!</Text>
          <Text>Your Account has been KYC Verified.</Text>
          <Text>If you haven't already done so, visit your portal now to:</Text>
        </Section>
      </Container>

      <Container>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <Row>
            <Column
              style={{
                backgroundColor: "#a317e9",
                height: "3px",
                lineHeight: "2px",
                fontSize: "2px",
              }}
            ></Column>
          </Row>
        </table>
      </Container>
      <Container
        style={{
          width: "100%",
          background: "#000000",
          padding: "20px",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <Section
          style={{
            fontFamily: "Open Sans', sans-serif",
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              color: "#434651",
              padding: "0 30px 20p",
              fontSize: "16px",
              textAlignLast: "center",
            }}
          >
            Email Us:
          </Text>

          <Text
            style={{
              textAlign: "justify",
              color: "#434651",
              padding: "0 30px 20p",
              fontSize: "16px",
            }}
          >
            <b>Risk disclaimer</b>: CFDs are complex instruments and come with a
            high risk of losing money rapidly due to leverage. You should
            consider whether you understand how CFDs work and whether you can
            afford to take the high risk of losing your money. Never deposit
            more than you are prepared to lose. Professional client's losses can
            exceed their deposit. Please see our risk warning policy and seek
            independent professional advice if you do not fully understand. This
            information is not directed or intended for distribution to or use
            by residents of certain countries/jurisdictions including, but not
            limited to, USA & OFAC. The Company holds the right to alter the
            aforementioned list of countries at its own discretion. Prime Index
            Ltd is a Company registered and licensed by Mwali International
            Services Authority in Comoros Union as an International Business
            Company with registration number HY00423265 and License Number
            T2023249. The registered office of the Company is Moheli Corporate
            Services Ltd, P.B. 1257 Bonovo Road, Fomboni, Comoros, KM. Prime
            Index is a trading name of Prime Index Ltd.
          </Text>
        </Section>
      </Container>
    </Html>
  );
}

import { Container, Row, Column, Img, Section } from "@react-email/components";
import React from "react";

const Header = () => {
  return (
    <Section
      style={{
        background: "#000000",
        padding: "20px",
        borderRadius: "10px 10px 0px 0px",
      }}
    >
      <Row>
        <Column align="center">
          <Img
            alt="TIO"
            src="http://localhost:3001/images/tioLogo.png"
            width={190.5}
            height={33.5}
          />
        </Column>
      </Row>
    </Section>
  );
};

export default Header;

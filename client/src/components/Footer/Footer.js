import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// material UI Imports
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";

// styled components
const FooterSection = styled.footer`
  min-height: 200px;
  width: 100%;
  background: #2b2d2e;
  color: #d5d5d5;
  a {
    color: #d5d5d5;
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const LogoSection = styled.h2`
  display: flex;
  align-items: center;
  padding: 2rem 5rem 0.5rem;
  p {
    font-size: ${(props) => props.theme.fontSizes.titleSize};
  }
  @media only screen and (max-width: 576px) {
    p {
      font-size: ${(props) => props.theme.fontSizes.xxxlarge};
    }
  }
`;

const EmailSection = styled.p`
  padding: 1rem 5rem 0;
  font-size: ${(props) => props.theme.fontSizes.large};
  a {
    font-size: ${(props) => props.theme.fontSizes.large};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.large};
    text-align: center;
  }
`;

const CopyrightSection = styled.div`
  padding: 0.5rem 5rem 0;
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
  @media only screen and (max-width: 768px) {
    p {
      text-align: center;
    }
  }
`;

// Copyright Component
const Copyright = () => {
  return (
    <Typography align="left">
      <span>Copyright ©</span>
      <Link to="/about">
        <span>SeungWon</span>
      </Link>{" "}
      <span>{new Date().getFullYear()}</span>
    </Typography>
  );
};

const Footer = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:576px)",
  });
  return (
    <FooterSection>
      <div style={{ padding: "30px 0 50px 0" }}>
        {breakPoint ? (
          <>
            <LogoSection>
              <TheatersIcon style={{ color: "#A5292A", fontSize: "3.6rem" }} />
              <p>Share-Video</p>
            </LogoSection>
            <EmailSection>
              <a href="mailto:seungwon.code@gmail.com">
                Email: seungwon.code@gmail.com
              </a>
            </EmailSection>
          </>
        ) : (
          <>
            <LogoSection>
              <TheatersIcon style={{ color: "#A5292A", fontSize: "2.4rem" }} />
              <p>Share-Video</p>
            </LogoSection>
            <EmailSection>
              <br />
              <p>Contact</p>
              <br />
              <a href="mailto:seungwon.code@gmail.com">
                seungwon.code@gmail.com
              </a>
            </EmailSection>
          </>
        )}
        <CopyrightSection>
          <Copyright />
        </CopyrightSection>
      </div>
    </FooterSection>
  );
};

export default Footer;

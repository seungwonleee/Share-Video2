import React from "react";
import { Link } from "react-router-dom";
import BatteryCharging20Icon from "@material-ui/icons/BatteryCharging20";
import styled from "styled-components";
import "./MenuFont.css";

// styled-components
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
  display: flex;
  padding: ${(props) => props.theme.paddings.xsmall};
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.titleSize};
`;

const LeftMenu = () => {
  return (
    <StyledLink to="/">
      <BatteryCharging20Icon style={{ fontSize: "4.8rem", color: "green" }} />
      <Title className="Logo-Font">Check Charing</Title>
    </StyledLink>
  );
};

export default LeftMenu;

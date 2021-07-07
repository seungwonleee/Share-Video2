import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './MenuFont.css';
//Material UI Imports
import TheatersIcon from '@material-ui/icons/Theaters';

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
      <TheatersIcon style={{ fontSize: '4.8rem', color: '#A5292A' }} />
      <Title className="Logo-Font">Share-Video</Title>
    </StyledLink>
  );
};

export default LeftMenu;

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./MenuFont.css";

// styled-components
const List = styled.ul`
  display: flex;
  list-style: none;
`;

const Item = styled.li`
  padding: ${(props) => props.theme.paddings.xlarge};
  font-size: ${(props) => props.theme.fontSizes.small};
  &:hover {
    color: #a5292a;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};
`;

const CenterMenu = () => {
  // 메뉴 목록
  const menuList = [
    { route: "/about", name: "About" },
    { route: "/", name: "menu1" },
    { route: "/", name: "menu2" },
    { route: "/", name: "menu3" },
  ];

  return (
    <List className="Menu-Font">
      {menuList.map((item, index) => {
        return (
          <StyledLink to={item.route} key={item.name}>
            <Item>{item.name}</Item>
          </StyledLink>
        );
      })}
    </List>
  );
};

export default CenterMenu;

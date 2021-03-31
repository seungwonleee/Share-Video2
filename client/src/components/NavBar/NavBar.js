import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import LeftMenu from "./Sections/LeftMenu";
import CenterMenu from "./Sections/CenterMenu";
import RightMenu from "./Sections/RightMenu";
import DrawerButton from "./DrawerButton";

// styled-components
const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #dedede;
  position: fixed;
  background: #ffffff;
  z-index: 5;
`;

const NavBar = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });

  return (
    <Navbar>
      {/* 로고 메뉴 */}
      <LeftMenu />

      {/* 중간 메뉴 */}
      {breakPoint ? (
        <>
          <CenterMenu />
          <RightMenu />
        </>
      ) : (
        <></>
      )}

      {/* Drawer 버튼 */}
      {breakPoint ? <></> : <DrawerButton />}
    </Navbar>
  );
};

export default NavBar;

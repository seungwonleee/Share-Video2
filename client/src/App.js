import React, { useEffect } from "react";
import Routes from "./Routes/Routes";
import { authService } from "./fire_module/fireMain";
import { useSelector, useDispatch } from "react-redux";
import { loginState, setUid } from "./features/auth/authSlice";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./Theme/theme";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// styled-components
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding:0;
    margin:0;
    font-size:10px;
  }
  html, body {
    height:100%;
    width:100%;
    background:#f7f7f7;
  }
  a {
    text-decoration:none;
    color: #73797a;
  }
`;

const App = () => {
  // const dispatch = useDispatch();

  // // 로그인 Auth 변경 감지
  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     // console.log("Auth 변경 감지 ===> ", user);
  //     if (user) {
  //       dispatch(loginState(true));
  //       dispatch(setUid(user.uid));
  //     } else {
  //       dispatch(loginState(false));
  //       dispatch(setUid(user));
  //     }
  //   });
  // }, []);

  return (
    <div>
      {/* 전역 스타일 지정해주는 컴포넌트 */}
      <GlobalStyle />
      {/* 페이지 이동시 Scroll 위치 상단 고정 컴포넌트*/}
      <ScrollToTop />

      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;

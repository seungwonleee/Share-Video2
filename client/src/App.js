import React from "react";
import dotenv from "dotenv";
import Routes from "./Routes/Routes";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Styles/GlobalStyle";
import theme from "./Theme/theme";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
dotenv.config();

const App = () => {
  return (
    <div>
      {/* 전역 스타일 지정해주는 global styled-components */}
      <GlobalStyle />
      {/* 페이지 이동시 Scroll 위치 상단 고정 컴포넌트*/}
      <ScrollToTop />
      {/* styled-components Function themes를 사용한 스타일 적용*/}
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
};

export default App;

import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import Auth from "../hoc/auth";
// 라우팅할 모든 페이지 imports
import LandingPage from "../components/LandingPage/LandingPage";
import AboutPage from "../components/AboutPage/AboutPage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import LoginPage from "../components/LoginPage/LoginPage";
import MyPage from "../components/MyPage/MyPage";
import FindAccountPage from "../components/FindAccountPage/FindAccountPage";
import NoMatchPage from "../components/NoMatchPage/NoMatchPage";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
//movie imports
import MovieDetail from "../components/MovieDetail/MovieDetail";

const MainSection = styled.section`
  background: #f7f7f7;
  padding-top: 55px;
`;

const Routes = () => {
  // 라우팅 경로 확인
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <Suspense>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}
      <MainSection>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage)} />
          <Route exact path="/about" component={Auth(AboutPage)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route
            exact
            path="/findaccount"
            component={Auth(FindAccountPage, false)}
          />
          {/* movie 관련 Route */}
          <Route exact path="/movie/:movieId" component={MovieDetail} />
          {/* 설정하지 않은 URL 입력시 NoMatchPage로 이동 */}
          <Route path="*" component={NoMatchPage} />
        </Switch>
      </MainSection>
      {pathname !== "/login" && pathname !== "/register" && <Footer />}
    </Suspense>
  );
};

export default Routes;

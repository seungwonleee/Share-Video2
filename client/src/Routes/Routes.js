import React from "react";
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
import SearchPlacePage from "../components/SearchPlacePage/SearchPlacePage";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import LoginPage from "../components/LoginPage/LoginPage";
import MyPage from "../components/MyPage/MyPage";
import FindAccountPage from "../components/FindAccountPage/FindAccountPage";
import NoMatchPage from "../components/NoMatchPage/NoMatchPage";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import IndividualWorkPage from "../components/IndividualWorkPage/IndividualWorkPage";
import VideoUploadPage from "../components/VideoUploadPage/VideoUploadPage";
import PaymentPage from "../components/PaymentPage/PaymentPage";
import CompletePaymentPage from "../components/PaymentPage/CompletePaymentPage";
//movie imports
import MovieDetail from "../components/MovieDetail/MovieDetail";

const MainSection = styled.section`
  background: #f7f7f7;
  padding-top: 55px;
`;

const Routes = () => {
  //option 미입력    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지
  // 라우팅 경로 확인
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}
      <MainSection>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage)} />
          <Route exact path="/searchplace" component={Auth(SearchPlacePage)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)} />
          <Route
            exact
            path="/findaccount"
            component={Auth(FindAccountPage, false)}
          />
          <Route
            exact
            path="/videoupload"
            component={Auth(VideoUploadPage, true)}
          />
          <Route
            exact
            path="/individualwork"
            component={Auth(IndividualWorkPage)}
          />
          <Route exact path="/payment" component={Auth(PaymentPage, true)} />
          <Route
            exact
            path="/completepayment"
            component={Auth(CompletePaymentPage, true)}
          />
          {/* movie 관련 Route */}
          <Route exact path="/movie/:movieId" component={MovieDetail} />
          {/* 설정하지 않은 URL 입력시 NoMatchPage로 이동 */}
          <Route path="*" component={NoMatchPage} />
        </Switch>
      </MainSection>
      {pathname !== "/login" && pathname !== "/register" && <Footer />}
    </>
  );
};

export default Routes;

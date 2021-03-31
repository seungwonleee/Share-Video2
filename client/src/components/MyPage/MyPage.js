import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const MyPage = () => {
  let history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 로그인한 유저가 아니라면 접근하지 못하도록 Redirect
  if (!isLoggedIn) {
    history.push("/");
  }
  return <div>여기는 mypage 페이지 입니다.</div>;
};

export default MyPage;

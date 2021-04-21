import React, { useState } from "react";
// import { authService } from "../../fire_module/fireMain";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoginState,
  setId,
  setEmail,
  setNickname,
} from "../../features/auth/authSlice";
import axios from "axios";
// Drawer 관련 Material UI Imports
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";

//Material UI 관련코드
const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
  listItemText: {
    fontSize: "1.6rem", //Insert your required size
  },
});

const DrawerButton = () => {
  const dispatch = useDispatch();
  //Material UI 관련코드
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  //redux 로그인 상태 확인
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log("토글메뉴 로그인==>", isLoggedIn);

  // 로그아웃하기
  let history = useHistory();
  const handleLogout = () => {
    // authService.signOut();
    axios
      .get("/api/users/logout")
      .then((res) => {
        console.log(res.data.removeCookie);
        if (res.data.removeCookie) {
          history.push("/");
          // 로그아웃시 Redux의 사용자 로그인 상태와 식별 id 초기화
          dispatch(setLoginState(false));
          dispatch(setId(null));
          dispatch(setEmail(null));
          dispatch(setNickname(null));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const itemsList = [
    { text: "극장 찾기", onClick: () => history.push("/searchplace") },
    { text: "개인 작품", onClick: () => history.push("/individualwork") },
    { text: "작품 공유하기", onClick: () => history.push("/videoupload") },
  ];
  // 로그인 상태 메뉴
  const loginList = [
    { text: "내 정보", onClick: () => history.push("/mypage") },
    { text: "로그아웃", onClick: () => handleLogout() },
  ];
  // 로그아웃 상태 메뉴
  const logOutList = [
    { text: "회원가입", onClick: () => history.push("/register") },
    { text: "로그인", onClick: () => history.push("/login") },
  ];

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {itemsList.map((item, index) => {
          const { text, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              <ListItemText
                primary={text}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {isLoggedIn ? (
        //로그인 true
        <List>
          {loginList.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText
                  primary={text}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        //로그인 false
        <List>
          {logOutList.map((item, index) => {
            const { text, onClick } = item;
            return (
              <ListItem button key={text} onClick={onClick}>
                <ListItemText
                  primary={text}
                  classes={{ primary: classes.listItemText }}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );

  return (
    <React.Fragment key={"right"}>
      <Button onClick={toggleDrawer("right", true)}>
        <MenuIcon style={{ fontSize: "3rem" }} />
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerButton;

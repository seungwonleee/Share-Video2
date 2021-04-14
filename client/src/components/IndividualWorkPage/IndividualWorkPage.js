import React, { useEffect, useState } from "react";
import axios from "axios";
import { dbService } from "../../fire_module/fireMain";
import DialogMessage from "../commons/DialogMessage";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridCards from "../commons/GridCards";

// Material UI 디자인 작성
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const IndividualWorkPage = () => {
  // Material UI 디자인 사용
  const classes = useStyles();

  const [individualWorkVideoList, setIndividualWorkVideo] = useState([]);

  //user별로 업로드한 영상을 불러와서 배열에 모두 담는다.
  const loadUserVideo = (userUidList) => {
    const videoList = [];
    userUidList.map((uid, index) => {
      dbService
        .collection(uid)
        .doc("video")
        .collection(uid)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc, index) => {
            videoList.push(doc.data());
          });
          setIndividualWorkVideo([...individualWorkVideoList, ...videoList]);
        });
    });
  };

  //user 리스트를 받아온다.
  async function loadUserList() {
    await axios
      .get("/api/users/list")
      .then((res) => {
        const userList = [...res.data.userList];
        // user들의 uid를 담은 배열
        const userUidList = userList.map((user, index) => {
          return user.uid;
        });
        console.log(userUidList);
        loadUserVideo(userUidList);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <div style={{ margin: "1rem auto", width: "85%" }}>
      <h1 style={{ fontSize: "3rem", textAlign: "center", margin: "2rem" }}>
        개인 작품
      </h1>
      {/* 개인작품 목록 Grid Cards */}
      <div className={classes.root}>
        <Grid container spacing={2}>
          {individualWorkVideoList &&
            individualWorkVideoList.map((movie, index) => (
              <GridCards
                individualWork
                key={index}
                title={movie.title}
                description={movie.description}
                genre={movie.genre}
                cost={movie.cost}
                email={movie.email}
                createdAt={movie.createdAt}
                creatorUid={movie.creatorUid}
                downloadURL={movie.downloadURL}
              />
            ))}
        </Grid>
      </div>
      {/* 장바구니 버튼 클릭시 dialog 메시지 호출 */}
      <DialogMessage />
    </div>
  );
};

export default IndividualWorkPage;

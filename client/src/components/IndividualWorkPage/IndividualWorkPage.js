import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { dbService } from "../../fire_module/fireMain";
import DialogMessage from "../commons/DialogMessage";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridCards from "../commons/GridCards";

const Container = styled.div`
  margin: 1rem auto;
  width: 85%;
  height: 100vh;
`;

const H1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 2rem;
`;

const SearchInputBox = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: flex-end;
  margin: 1rem auto;
`;

const Input = styled.input`
  height: 3rem;
  font-size: ${(props) => props.theme.fontSizes.base};
  border: solid 1px lightgray;
  margin: 0 2rem;
  padding: 1rem;
  &:focus {
    transition: 0.5s;
    outline: none;
    border: solid 1px #a5292a;
  }
`;

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
  const [searchVideo, setSearchVideo] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //user별로 업로드한 영상을 불러와서 배열에 모두 담는다.
  const loadUserVideo = (userUidList) => {
    // const videoList = [];
    // userUidList.map((uid, index) => {
    //   dbService
    //     .collection(uid)
    //     .doc("video")
    //     .collection(uid)
    //     .onSnapshot((snapshot) => {
    //       snapshot.docs.map((doc, index) => {
    //         videoList.push(doc.data());
    //       });
    //       setIndividualWorkVideo([...individualWorkVideoList, ...videoList]);
    //     });
    // });
  };

  //user 리스트를 받아온다.
  // async function loadUserList() {
  //   await axios
  //     .get("/api/users/list")
  //     .then((res) => {
  //       const userList = [...res.data.userList];
  //       // user들의 uid를 담은 배열
  //       const userUidList = userList.map((user, index) => {
  //         return user.uid;
  //       });
  //       console.log(userUidList);
  //       loadUserVideo(userUidList);
  //     })
  //     .catch((error) => console.log(error));
  // }

  useEffect(() => {
    // loadUserList();
  }, []);

  // individualWorkVideoList 에서 개인작품 검색
  const handleSearch = (event) => {
    const { value } = event.currentTarget;
    setSearchVideo(value);
    let pattern = value;
    //정규표현식 리터럴 객체 (모든 패턴을 찾는다.)
    let regexAll = new RegExp(pattern, "gim");

    const result = individualWorkVideoList.filter((video) => {
      if (regexAll.test(video.title)) {
        return video;
      }
    });

    setSearchResult([...result]);
  };

  return (
    <Container>
      <H1>개인 작품</H1>
      <SearchInputBox>
        <Input
          type="text"
          placeholder="영상을 검색하세요."
          value={searchVideo}
          onChange={handleSearch}
        />
      </SearchInputBox>
      {/* 개인작품 목록 Grid Cards */}
      {searchResult.length >= 1 ? (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {searchResult.map((movie, index) => (
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
      ) : (
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
      )}

      {/* 장바구니 버튼 클릭시 dialog 메시지 호출 */}
      <DialogMessage />
    </Container>
  );
};

export default IndividualWorkPage;

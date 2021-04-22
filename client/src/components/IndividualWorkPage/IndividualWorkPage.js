import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DialogMessage from "../commons/DialogMessage";
import { useMediaQuery } from "react-responsive";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridCards from "../commons/GridCards";

const Container = styled.div`
  margin: 1rem auto;
  width: 85%;
  min-height: 80vh;
  height: 100%;
`;

const H1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin: 2rem;
`;

const SearchInputBox = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
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
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  // Material UI 디자인 사용
  const classes = useStyles();

  const [videos, setVideos] = useState([]);
  const [searchVideo, setSearchVideo] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //user별로 업로드한 영상을 불러와서 배열에 모두 담는다.
  const getUserVideo = () => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setVideos(response.data.videos);
      } else {
        alert("영상을 불러오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    getUserVideo();
  }, []);

  // individualWorkVideoList 에서 개인작품 검색
  const handleSearch = (event) => {
    const { value } = event.currentTarget;
    setSearchVideo(value);
    let pattern = value;
    // //정규표현식 리터럴 객체 (모든 패턴을 찾는다.)
    let regexAll = new RegExp(pattern, "gim");
    const result = videos.filter((video) => {
      if (regexAll.test(video.title)) {
        return video;
      }
      if (regexAll.test(video.writer.nickname)) {
        return video;
      }
    });
    setSearchResult([...result]);
  };

  return (
    <Container>
      <H1>개인 작품</H1>
      {breakPoint ? (
        // 데스크탑 버전
        <SearchInputBox>
          <Input
            type="text"
            placeholder="제목 또는 작가로 검색"
            value={searchVideo}
            onChange={handleSearch}
            style={{ width: "100%", maxWidth: "768px" }}
          />
        </SearchInputBox>
      ) : (
        // 모바일 버전
        <SearchInputBox>
          <Input
            type="text"
            placeholder="제목 또는 작가로 검색"
            value={searchVideo}
            onChange={handleSearch}
            style={{ width: "100%" }}
          />
        </SearchInputBox>
      )}
      {/* 개인작품 목록 Grid Cards */}
      {searchResult.length >= 1 ? (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {searchResult.map((video, index) => (
              <GridCards
                individualWork
                key={index}
                title={video.title}
                description={video.description}
                genre={video.genre}
                cost={video.cost}
                duration={video.duration}
                writer={video.writer.nickname}
                createdAt={video.createdAt}
                views={video.views}
                downloadPath={video.filePath}
                thumbnail={video.thumbnail}
              />
            ))}
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            {videos &&
              videos.map((video, index) => (
                <GridCards
                  individualWork
                  key={index}
                  title={video.title}
                  description={video.description}
                  genre={video.genre}
                  cost={video.cost}
                  duration={video.duration}
                  writer={video.writer.nickname}
                  createdAt={video.createdAt}
                  views={video.views}
                  downloadPath={video.filePath}
                  thumbnail={video.thumbnail}
                  _id={video._id}
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

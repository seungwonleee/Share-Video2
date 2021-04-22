import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DialogMessage from "../commons/DialogMessage";
import moment from "moment";
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
        alert("Failed to get Videos");
      }
    });
  };

  useEffect(() => {
    getUserVideo();
  }, []);

  // individualWorkVideoList 에서 개인작품 검색
  const handleSearch = (event) => {
    // const { value } = event.currentTarget;
    // setSearchVideo(value);
    // let pattern = value;
    // //정규표현식 리터럴 객체 (모든 패턴을 찾는다.)
    // let regexAll = new RegExp(pattern, "gim");
    // const result = individualWorkVideoList.filter((video) => {
    //   if (regexAll.test(video.title)) {
    //     return video;
    //   }
    // });
    // setSearchResult([...result]);
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

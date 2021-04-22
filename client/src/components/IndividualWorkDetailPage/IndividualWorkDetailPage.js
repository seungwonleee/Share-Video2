import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import IndividualWorkDetailInfo from "./Sections/IndividualWorkDetailInfo";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Video = styled.video`
  /* width: 100%; */
  /* height: 100%; */
  /* max-width: 600px; */
  /* max-height: 500px; */
`;

/////////////////////////////////////////
const Container = styled.div`
  width: 85%;
  height: 100%;
  min-height: 80vh;
  margin: 1rem auto;
`;

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const IndividualWorkDetailPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  //:videoId url을 가져온다.
  let { videoId } = useParams();

  const [video, setVideo] = useState([]);

  const videoData = {
    videoId: videoId,
  };

  const getVideoDetailInfo = () => {
    axios.post("/api/video/getVideo", videoData).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("영상 정보를 불러오는데 실패했습니다. 나중에 시도해주세요.");
      }
    });
  };
  useEffect(() => {
    getVideoDetailInfo();
  }, []);

  //오른쪽 클릭 영상 다운로드 금지
  const hanldeDisabledRightClick = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      {breakPoint ? (
        //데스크탑 버전
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Video
              src={`http://localhost:5000/${video.filePath}`}
              controls
              controlsList="nodownload"
              onContextMenu={hanldeDisabledRightClick}
              style={{ minWidth: "768px", maxWidth: "1400px", width: "100%" }}
            />
          </div>
          <Container
            style={{
              minWidth: "768px",
              maxWidth: "1400px",
              width: "85%",
              margin: "1rem auto",
            }}
          >
            {/* video Info (제목, 장르, 재생시간, 평점 출시일) */}
            <IndividualWorkDetailInfo video={video} />

            {/* 후기 Comments 목록*/}
          </Container>
        </>
      ) : (
        //모바일 버전
        <>
          <Video
            src={`http://localhost:5000/${video.filePath}`}
            controls
            controlsList="nodownload"
            onContextMenu={hanldeDisabledRightClick}
            style={{ width: "100%" }}
          />

          <Container style={{ width: "85%", margin: "1rem auto" }}>
            {/* video Info (제목, 장르, 재생시간, 평점 출시일) */}
            <IndividualWorkDetailInfo video={video} />

            {/* 후기 Comments 목록*/}
          </Container>
        </>
      )}
    </div>
  );
};

export default IndividualWorkDetailPage;

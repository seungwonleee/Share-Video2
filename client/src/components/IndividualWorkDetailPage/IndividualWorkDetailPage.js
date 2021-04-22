import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import IndividualWorkDetailInfo from "./Sections/IndividualWorkDetailInfo";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import SideVideo from "./Sections/SideVideo";
import ButtonBar from "./Sections/ButtonBar";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
  min-height: 80vh;
  height: 100%;
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
    query: "(min-width:1280px)",
  });
  //:videoId url을 가져온다.
  let { videoId } = useParams();

  const loginUser = useSelector((state) => state.auth.userId);

  const [video, setVideo] = useState("");

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

  if (video && loginUser) {
    return (
      <Container>
        {breakPoint ? (
          //데스크탑 버전
          <Grid container spacing={2}>
            <Grid item md={8} lg={8}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2rem 1rem",
                  width: "100%",
                }}
              >
                <video
                  src={`http://localhost:5000/${video.filePath}`}
                  controls
                  controlsList="nodownload"
                  onContextMenu={hanldeDisabledRightClick}
                  style={{
                    width: "100%",
                    minWidth: "768px",
                    maxWidth: "1400px",
                  }}
                />
              </div>
              <div
                style={{
                  minWidth: "768px",
                  maxWidth: "960px",
                  width: "85%",
                  margin: "1rem auto",
                  // height: "80vh",
                }}
              >
                {/* video Info (제목, 장르, 재생시간, 평점 출시일) */}
                <IndividualWorkDetailInfo video={video} />
                {/* 좋아요, 장바구니, 구매하기 Button */}
                <ButtonBar
                  userTo={video.writer._id}
                  userFrom={loginUser}
                  video={video}
                />
                {/* 후기 Comments */}
              </div>
            </Grid>
            <Grid item md={4} lg={4}>
              {/* 사이드바 영상 추천 목록 */}
              <div style={{ borderLeft: "1px solid #D3D3D3D3" }}>
                <SideVideo />
              </div>
            </Grid>
          </Grid>
        ) : (
          //모바일 버전
          <>
            <video
              src={`http://localhost:5000/${video.filePath}`}
              controls
              controlsList="nodownload"
              onContextMenu={hanldeDisabledRightClick}
              style={{ width: "100%" }}
            />

            <div style={{ width: "85%", margin: "1rem auto" }}>
              {/* video Info (제목, 장르, 재생시간, 평점 출시일) */}
              <IndividualWorkDetailInfo video={video} />

              {/* 좋아요, 장바구니, 구매하기 Button*/}
              <ButtonBar />
              {/* 후기 Comments */}
            </div>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          height: "100%",
        }}
      >
        Loading...
      </div>
    );
  }
};

export default IndividualWorkDetailPage;

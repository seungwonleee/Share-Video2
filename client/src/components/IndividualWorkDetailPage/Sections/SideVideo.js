import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const H2 = styled.h2`
  margin-top: 2rem;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  padding: 0 2rem;
`;

const Container = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0 2rem;
`;

const Image = styled.div`
  width: 40%;
  margin-right: 1rem;
  img {
    width: 100%;
  }
`;

const Description = styled.div`
  width: 50%;
  p:first-child {
    font-size: ${(props) => props.theme.fontSizes.base};
    color: #000000;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const SideVideo = () => {
  const [sideVideos, setSideVideos] = useState([]);

  //user별로 업로드한 영상을 불러와서 배열에 모두 담는다.
  const getUserVideo = () => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setSideVideos(response.data.videos);
      } else {
        alert("영상을 불러오는데 실패했습니다.");
      }
    });
  };

  useEffect(() => {
    getUserVideo();
  }, []);

  const sideVideoItem = sideVideos.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);

    //추천 영상 4개로 제한
    if (index >= 5) {
      return;
    } else {
      return (
        <Container key={index}>
          <Image>
            <a href={`/individualwork/${video._id}`}>
              <img
                src={`http://localhost:5000/${video.thumbnail}`}
                alt={`thumbnail-${video.title}`}
              />
            </a>
          </Image>
          <Description>
            <a href={`/individualwork/${video._id}`}>
              <p>{video.title}</p>
              <p>제작자: {video.writer.name}</p>
              <p>조회수: {video.views}</p>
              <p>
                재생 시간: {minutes} : {seconds}
              </p>
            </a>
          </Description>
        </Container>
      );
    }
  });

  return (
    <>
      <H2>추천 영상</H2>
      {sideVideoItem}
    </>
  );
};

export default SideVideo;

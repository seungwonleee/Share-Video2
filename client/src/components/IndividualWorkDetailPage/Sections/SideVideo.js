import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const ThumnailImage = styled.img`
  width: 120px;
  height: 180px;
`;

const SideVideo = () => {
  const [sideVideos, setSideVideos] = useState([]);

  //user별로 업로드한 영상을 불러와서 배열에 모두 담는다.
  const getUserVideo = () => {
    axios
      .get('/api/video/getVideos')
      .then((response) => {
        setSideVideos(response.data.videos);
      })
      .catch((error) => {
        alert(
          '추천 영상을 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
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
              <ThumnailImage
                src={video.thumbnail}
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

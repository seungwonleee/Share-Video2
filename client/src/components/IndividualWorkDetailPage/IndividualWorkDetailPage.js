import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IndividualWorkDetailInfo from './Sections/IndividualWorkDetailInfo';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import SideVideo from './Sections/SideVideo';
import ButtonBar from './Sections/ButtonBar';
import Comment from './Sections/Comment';
// Material UI Imports
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  min-height: 80vh;
  height: 100%;
`;

const IndividualWorkDetailPage = () => {
  const breakPoint = useMediaQuery({
    query: '(min-width:1280px)',
  });
  //:videoId url을 가져온다.
  let { videoId } = useParams();

  const loginUser = useSelector((state) => state.auth.userInfo.userId);

  const [video, setVideo] = useState('');
  const getVideoDetailInfo = () => {
    const videoData = {
      videoId: videoId,
    };
    axios
      .post('/api/video/getVideo', videoData)
      .then((response) => {
        setVideo(response.data.video);
      })
      .catch((error) => {
        console.error(error);
        alert('문제가 발생했습니다. 잠시후 다시 시도해 주세요.');
      });
  };
  useEffect(() => {
    getVideoDetailInfo();
  }, []);

  //오른쪽 클릭 영상 다운로드 금지
  const hanldeDisabledRightClick = (event) => {
    event.preventDefault();
  };

  if (video) {
    return (
      <Container>
        {breakPoint ? (
          //데스크탑 버전
          <Grid container spacing={2}>
            <Grid item md={8} lg={8}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '2rem 1rem',
                  width: '100%',
                }}
              >
                <video
                  src={video.filePath}
                  controls
                  controlsList="nodownload"
                  onContextMenu={hanldeDisabledRightClick}
                  style={{
                    width: '100%',
                    minWidth: '768px',
                    maxWidth: '1400px',
                  }}
                />
              </div>
              <div
                style={{
                  minWidth: '768px',
                  maxWidth: '960px',
                  width: '85%',
                  margin: '1rem auto',
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
                {/* Comments */}
                <Comment />
              </div>
            </Grid>
            <Grid item md={4} lg={4}>
              {/* 사이드바 영상 추천 목록 */}
              <div style={{ borderLeft: '1px solid #D3D3D3D3' }}>
                <SideVideo />
              </div>
            </Grid>
          </Grid>
        ) : (
          //모바일 버전
          <>
            <video
              src={video.filePath}
              controls
              controlsList="nodownload"
              onContextMenu={hanldeDisabledRightClick}
              style={{ width: '100%' }}
            />

            <div style={{ width: '85%', margin: '1rem auto' }}>
              {/* video Info (제목, 장르, 재생시간, 평점 출시일) */}
              <IndividualWorkDetailInfo video={video} />

              {/* 좋아요, 장바구니, 구매하기 Button*/}
              <ButtonBar
                userTo={video.writer._id}
                userFrom={loginUser}
                video={video}
              />
              {/* Comments 댓글 컴포넌트*/}
              <Comment />
              {/* 사이드바 영상 추천 목록 */}
              <div style={{ margin: '3rem 0 ' }}>
                <SideVideo />
              </div>
            </div>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
          height: '100%',
        }}
      >
        Loading...
      </div>
    );
  }
};

export default IndividualWorkDetailPage;

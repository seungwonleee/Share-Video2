import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  ORIGINAL_SIZE,
  POSTER_SIZE,
} from '../Config';
import MainImage from './Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  width: 85%;
  height: 100%;
  min-height: 80vh;
  margin: 1rem auto;
`;

const CastToggleButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
  font-size: ${(props) => props.theme.fontSizes.xlarge};
`;

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const MovieDetail = (props) => {
  const classes = useStyles();
  //:movieId url을 가져온다.
  let { movieId } = useParams();

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);

  const getMovieDetailInfo = (endpointMovieInfo) => {
    // 영화 상세 정보
    axios
      .get(endpointMovieInfo)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        alert(
          '상세 정보를 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      });
  };

  const getMovieCastInfo = (endpointCast) => {
    // 영화 관계자 정보
    axios
      .get(endpointCast)
      .then((response) => {
        setCasts(response.data.cast);
      })
      .catch((error) => {
        alert(
          '관계자 정보를 불러오는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      });
  };

  useEffect(() => {
    // 영화 상세 정보 호출 API
    let endpointMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-KR`;
    // 영화 관계자 정보 호출 API
    let endpointCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`;
    getMovieDetailInfo(endpointMovieInfo);
    getMovieCastInfo(endpointCast);
  }, []);

  return (
    <div>
      {/* Movie Image */}
      <MainImage
        image={`${IMAGE_BASE_URL}${ORIGINAL_SIZE}${Movie.backdrop_path}`}
        titleEnglish={Movie.original_title}
        titleKorean={Movie.title}
        overview={Movie.overview}
      />
      {/* Movie Detail InFormation */}
      <Container style={{ width: '85%', margin: '1rem auto' }}>
        {/* Movie Info (제목, 장르, 재생시간, 평점 출시일) */}
        <MovieInfo movie={Movie} />
        <br />
        {/* 출연진 확인하기 버튼 (토글) */}
        <CastToggleButton>출연진 보기</CastToggleButton>

        {/* 출연자 list Grid Cards */}

        <div className={classes.root}>
          <Grid container spacing={2}>
            {Casts &&
              Casts.map((cast, index) => (
                <GridCards
                  castList
                  key={index}
                  image={
                    cast.profile_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${cast.profile_path}`
                      : null
                  }
                  castName={cast.name}
                  //   movieId={cast.id}
                  character={cast.character}
                />
              ))}
          </Grid>
        </div>

        <br />

        {/* 후기 Comments 목록*/}
      </Container>
    </div>
  );
};

export default MovieDetail;

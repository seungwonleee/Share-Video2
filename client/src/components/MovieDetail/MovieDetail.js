import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  ORIGINAL_SIZE,
  POSTER_SIZE,
} from "../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

const MovieDetail = (props) => {
  const classes = useStyles();
  // URL 값 받아오기
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  const actorToggleView = () => {
    setActorToggle(!ActorToggle);
  };

  const getMovieDetailInfo = async (endpointMovieInfo) => {
    // 영화 상세 정보
    await axios.get(endpointMovieInfo).then((response) => {
      setMovie(response.data);
    });
  };

  const getMovieCastInfo = async (endpointCast) => {
    // 영화 관계자 정보
    await axios.get(endpointCast).then((response) => {
      setCasts(response.data.cast);
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
        text={Movie.overview}
      />
      {/* Movie Detail InFormation */}
      <Container style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info (제목, 장르, 재생시간, 평점 출시일) */}
        <MovieInfo movie={Movie} />
        <br />
        {/* 출연진 확인하기 버튼 (토글) */}
        <CastToggleButton>
          <Button
            className={classes.button}
            variant="contained"
            onClick={actorToggleView}
          >
            출연진 보기
          </Button>
        </CastToggleButton>

        {/* 출연자 list Grid Cards */}
        {ActorToggle && (
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
        )}

        <br />

        {/* 후기 Comments 목록*/}
      </Container>
    </div>
  );
};

export default MovieDetail;

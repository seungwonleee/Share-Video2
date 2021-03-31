import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  ORIGINAL_SIZE,
  POSTER_SIZE,
} from "../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Container = styled.div`
  width: 100%;
`;

const MovieList = styled.div`
  width: 85%;
  margin: 1rem auto;
`;

const LoadMoreButton = styled.div`
  display: flex;
  justify-content: center;
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

const LandingPage = () => {
  // Material UI 디자인 사용
  const classes = useStyles();

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const getMovies = (endpoint) => {
    axios.get(endpoint).then((response) => {
      console.log("인기 영화===>", response.data);
      setMovies([...Movies, ...response.data.results]);
      setMainMovieImage(response.data.results[0]);
      setCurrentPage(response.data.page);
    });
  };
  // 인기 영화 호출 API
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
    getMovies(endpoint);
  }, []);

  // 인기 영화 내역 추가 호출
  const loadMoreButton = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${
      currentPage + 1
    }`;
    getMovies(endpoint);
  };

  return (
    <>
      <Container>
        {/* Main Image */}
        {MainMovieImage && (
          <MainImage
            image={`${IMAGE_BASE_URL}${ORIGINAL_SIZE}${MainMovieImage.backdrop_path}`}
            titleEnglish={MainMovieImage.original_title}
            titleKorean={MainMovieImage.title}
            text={MainMovieImage.overview}
          />
        )}

        <MovieList>
          <h2>인기 Movies</h2>
          <br />
          <hr />
          <br />
          {/* 인기 Movie 목록 Grid Cards */}
          <div className={classes.root}>
            <Grid container spacing={2}>
              {Movies &&
                Movies.map((movie, index) => (
                  <GridCards
                    landingPage
                    key={index}
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieNameEnglish={movie.original_title}
                    movieNameKorean={movie.title}
                    voteAverage={movie.vote_average}
                  />
                ))}
            </Grid>
          </div>
        </MovieList>
      </Container>
      {/* 영화 목록 더보기 버튼 */}
      <LoadMoreButton>
        <button onClick={loadMoreButton}>Load More</button>
      </LoadMoreButton>
    </>
  );
};

export default LandingPage;

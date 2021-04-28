import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  ORIGINAL_SIZE,
  POSTER_SIZE,
} from "../Config";
import GridCards from "../commons/GridCards";
import Item from "./Sections/CarouselMainImage";
import DialogMessage from "../commons/DialogMessage";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  width: 100%;
`;

const MovieList = styled.div`
  width: 85%;
  margin: 1rem auto;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxxlarge};
  padding-bottom: ${(props) => props.theme.paddings.xxxlarge};
  border-bottom: 1px solid gray;
  margin-bottom: 1.5rem;
`;

const LoadMoreButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0 3rem 0;
  Button {
    font-size: ${(props) => props.theme.fontSizes.xxxlarge};
    padding: 1.5rem 4rem;
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

const LandingPage = () => {
  // Material UI 디자인 사용
  const classes = useStyles();

  const [Movies, setMovies] = useState([]);
  const [mainMovieImage, setMainMovieImage] = useState([]);
  console.log(mainMovieImage);
  const [currentPage, setCurrentPage] = useState(0);

  const getMovies = (endpoint) => {
    axios.get(endpoint).then((response) => {
      // console.log("인기 영화 ===>", response.data.results);
      setMovies([...Movies, ...response.data.results]);
      setMainMovieImage(response.data.results);
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
  // console.log("Carousel 이미지 ====>", mainMovieImage);
  return (
    <>
      <Container>
        {/* Main Image Carousel*/}
        {mainMovieImage && (
          <Carousel
            animation="slide"
            IndicatorIcon={false}
            indicatorIconButtonProps={{
              style: {
                display: "none",
              },
            }}
          >
            {mainMovieImage.map((image, i) => {
              return (
                <Item
                  key={i}
                  image={`${IMAGE_BASE_URL}${ORIGINAL_SIZE}${image.backdrop_path}`}
                  title={image.title}
                  original_title={image.original_title}
                  overview={image.overview}
                />
              );
            })}
          </Carousel>
        )}

        <MovieList>
          <Title>추천 Movies</Title>

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
                    movieId={String(movie.id)}
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
        <Button variant="contained" onClick={loadMoreButton}>
          Load More
        </Button>
      </LoadMoreButton>
      {/* 좋아요(like), Clipboard 버튼 클릭시 dialog 메시지 호출 */}
      <DialogMessage />
    </>
  );
};

export default LandingPage;

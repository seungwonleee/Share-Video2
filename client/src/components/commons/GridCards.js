import React from "react";
import styled from "styled-components";
import noImage from "../../images/No_image.svg";
import { useSelector } from "react-redux";
import { dbService } from "../../fire_module/fireMain";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    // height: 250,
    paddingTop: "56.25%", // 16:9
  },
  img: {
    width: "100%",
    height: "320px",
  },
}));

// styled-components
const Image = styled.img`
  width: 100%;
  height: 320px;
`;

const GridCards = ({
  // movie, movieDetail 관련 props
  landingPage,
  castList,
  individualWork,
  image,
  movieId,
  movieNameEnglish,
  movieNameKorean,
  voteAverage,
  castName,
  character,
  //individualWork 관련 props
  cost,
  createdAt,
  creatorUid,
  description,
  downloadURL,
  email,
  genre,
  title,
}) => {
  const classes = useStyles();
  const uid = useSelector((state) => state.auth.uid);

  //사용자 식별 uid 와 좋아요 누른 목록 DB에 저장
  const handleLikeItem = () => {
    dbService.collection(uid).doc("like").collection(uid).doc(movieId).set({
      movieId,
      image,
      movieNameKorean,
      movieNameEnglish,
      voteAverage,
      createdAt: Date.now(),
    });
  };

  if (landingPage) {
    return (
      // 인기 영화 목록 Grid Cards (LandingPage)
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <a href={`/movie/${movieId}`}>
            <CardMedia>
              <Image src={image ? image : noImage} />
            </CardMedia>
          </a>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {movieNameKorean} <br /> ({movieNameEnglish})
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <IconButton
                aria-label="add to favorites"
                onClick={handleLikeItem}
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
            <div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ paddingRight: "1rem" }}
              >
                평점: {voteAverage}
              </Typography>
            </div>
          </CardActions>
        </Card>
      </Grid>
    );
  } else if (castList) {
    return (
      // 출연진 목록 Grid Cards (MovieDetialPage)
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <CardMedia>
            <Image src={image ? image : noImage} />
          </CardMedia>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              등장인물: {character}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              본명: {castName}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  } else if (individualWork) {
    //업로드 몇 분 전
    const uploadTimeMinutes = Math.floor(
      ((Date.now() - createdAt) * 0.1) / 60 / 60
    );
    //업로드 몇 시간 전
    const uploadTimeHour = Math.floor(
      ((Date.now() - createdAt) * 0.1) / 60 / 60 / 60
    );
    // 업로드 몇 일 전
    const uploadTimeDay = Math.floor(
      ((Date.now() - createdAt) * 0.1) / 60 / 60 / 60 / 60
    );
    return (
      // 개인 작품 목록 Grid Cards (IndividualWorkPage)
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card className={classes.root}>
          <CardMedia>
            <video
              src={downloadURL ? downloadURL : noImage}
              style={{ width: "100%", height: "100%" }}
            />
          </CardMedia>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              제목: {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              설명: {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              장르: {genre}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              가격: {cost === 0 ? "무료" : cost}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              제작자: {email}
              <input type="hidden" value={creatorUid} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              업로드일:{" "}
              {uploadTimeMinutes > 60
                ? `${
                    uploadTimeHour > 24
                      ? `${uploadTimeDay} 일 전`
                      : `${uploadTimeHour} 시간 전`
                  }`
                : `${uploadTimeMinutes} 분 전`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
};
export default GridCards;

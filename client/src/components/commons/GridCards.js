import React from "react";
import styled from "styled-components";
import noImage from "../../images/No_image.svg";
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
  landingPage,
  image,
  movieId,
  movieNameEnglish,
  movieNameKorean,
  voteAverage,
  castList,
  castName,
  character,
}) => {
  const classes = useStyles();

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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
            <div style={{ paddingRight: "1rem" }}>
              <Typography variant="body2" color="textSecondary" component="p">
                평점: {voteAverage}
              </Typography>
            </div>
          </CardActions>
        </Card>
      </Grid>
    );
  } else if (castList) {
    return (
      // 출연진 목록 Grid Cards
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
  }
};
export default GridCards;

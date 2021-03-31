import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

const GridCards = ({
  image,
  movieId,
  movieName,
  landingPage,
  cast,
  name,
  character,
}) => {
  const classes = useStyles();

  if (landingPage) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <a href={`/movie/${movieId}`}>
          <Paper className={classes.paper}>
            <img
              style={{ width: "100%", height: "320px" }}
              src={image}
              alt={movieName}
            />
          </Paper>
        </a>
      </Grid>
    );
  } else if (cast) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Paper className={classes.paper}>
          <img
            style={{ width: "100%", height: "320px" }}
            src={image}
            alt={name}
          />
        </Paper>
      </Grid>
    );
  }
};
export default GridCards;

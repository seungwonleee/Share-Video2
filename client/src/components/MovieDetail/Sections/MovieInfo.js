import React from "react";
import { useMediaQuery } from "react-responsive";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  mobileTable: {
    width: "100%",
    textAlign: "center",
    border: "1px solid gray",
    borderRadius: "4px",
  },
  mobileTh: {
    fontSize: "1.6rem",
    border: "1px solid gray",
    borderRadius: "4px",
    background: "gray",
  },
  mobileTd: {
    fontSize: "1.4rem",
    border: "1px solid gray",
    borderRadius: "4px",
  },
});

const MovieInfo = ({ movie }) => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  const classes = useStyles();

  const genresCollection = movie.genres
    ? movie.genres.map((genre) => genre.name).join(", ")
    : "";

  return (
    <>
      {breakPoint ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ background: "gray" }}>
              <TableRow>
                <TableCell align="center">제목</TableCell>
                <TableCell align="center">장르</TableCell>
                <TableCell align="center">재생 시간</TableCell>
                <TableCell align="center">평점</TableCell>
                <TableCell align="center">출시현황 / 출시일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">
                  {movie.original_title} <br /> {movie.title}
                </TableCell>
                <TableCell align="center">{genresCollection}</TableCell>
                <TableCell align="center">{movie.runtime} 분</TableCell>
                <TableCell align="center">{movie.vote_average}</TableCell>
                <TableCell align="center">
                  {movie.status} / {movie.release_date}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <table className={classes.mobileTable}>
          <tr>
            <th className={classes.mobileTh}>제목</th>
            <td className={classes.mobileTd}>
              {movie.original_title} <br /> {movie.title}
            </td>
          </tr>
          <tr>
            <th className={classes.mobileTh}>장르</th>
            <td className={classes.mobileTd}>{genresCollection}</td>
          </tr>
          <tr>
            <th className={classes.mobileTh}>재생 시간</th>
            <td className={classes.mobileTd}>{movie.runtime} 분</td>
          </tr>
          <tr>
            <th className={classes.mobileTh}>평점</th>
            <td className={classes.mobileTd}>{movie.vote_average}</td>
          </tr>
          <tr>
            <th className={classes.mobileTh}>출시현황 / 출시일</th>
            <td className={classes.mobileTd}>
              {movie.status} / {movie.release_date}
            </td>
          </tr>
        </table>
      )}
    </>
  );
};

export default MovieInfo;

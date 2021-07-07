import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { useSelector } from 'react-redux';
//Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  mobileTable: {
    width: '100%',
    textAlign: 'center',
    border: '1px solid gray',
    borderRadius: '4px',
    background: '#F7F7F7',
  },
  mobileTh: {
    fontSize: '1.6rem',
    border: '1px solid gray',
    borderRadius: '4px',
    background: '#2C2D2E',
    color: '#FFFFFF',
  },
  mobileTd: {
    fontSize: '1.4rem',
    border: '1px solid gray',
    borderRadius: '4px',
  },
  desktopTh: {
    background: '#2C2D2E',
  },
  desktopThCell: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
  desktopTdCell: {
    textAlign: 'center',
  },
});

const IndividualWorkDetailInfo = ({ video }) => {
  const breakPoint = useMediaQuery({
    query: '(min-width:768px)',
  });
  const classes = useStyles();

  const likeCountNum = useSelector((state) => state.like.count);

  const title = video.title;
  const description = video.description;
  const genre = video.genre;

  const createdAt = moment(video.createdAt).format('LL');
  const duration = Math.floor(Number(video.duration));
  const hour = parseInt(duration / 3600);
  const min = parseInt((duration % 3600) / 60);
  const sec = duration % 60;

  const [likeCount, setLikeCount] = useState(0);

  const likeData = {
    videoId: video._id,
  };

  useEffect(() => {
    axios.post('/api/like/getLikes', likeData).then((response) => {
      // console.log("getLikes", response.data.likes);
      if (response.data.success) {
        setLikeCount(response.data.likes.length);
      } else {
        alert(
          '좋아요 수를 불러오는데 문제가 발생했습니다. 나중에 시도해주세요.'
        );
      }
    });
  }, [likeCountNum]);

  return (
    <>
      {breakPoint ? (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.desktopTh}>
                <TableRow>
                  <TableCell className={classes.desktopThCell}>제목</TableCell>

                  <TableCell className={classes.desktopThCell}>장르</TableCell>
                  <TableCell className={classes.desktopThCell}>
                    재생 시간
                  </TableCell>
                  <TableCell className={classes.desktopThCell}>
                    좋아요
                  </TableCell>
                  <TableCell className={classes.desktopThCell}>
                    업로드
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.desktopTdCell}>
                    {title}
                  </TableCell>
                  <TableCell className={classes.desktopTdCell}>
                    {genre}
                  </TableCell>
                  <TableCell className={classes.desktopTdCell}>{`${
                    min ? `${min}분` : ''
                  }${sec ? `${sec}초` : ''}`}</TableCell>
                  <TableCell className={classes.desktopTdCell}>
                    {likeCount}
                  </TableCell>
                  <TableCell className={classes.desktopTdCell}>
                    {createdAt}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.desktopTh}>
                <TableRow>
                  <TableCell className={classes.desktopThCell}>
                    줄거리
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.desktopTdCell}>
                    {description}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <table className={classes.mobileTable}>
            <tr>
              <th className={classes.mobileTh}>제목</th>
              <td className={classes.mobileTd}>{title}</td>
            </tr>
            <tr>
              <th className={classes.mobileTh}>장르</th>
              <td className={classes.mobileTd}>{genre}</td>
            </tr>
            <tr>
              <th className={classes.mobileTh}>재생 시간</th>
              <td className={classes.mobileTd}>{`${min ? `${min}분` : ''}${
                sec ? `${sec}초` : ''
              }`}</td>
            </tr>
            <tr>
              <th className={classes.mobileTh}>좋아요</th>
              <td className={classes.mobileTd}>{likeCount}</td>
            </tr>
            <tr>
              <th className={classes.mobileTh}>업로드</th>
              <td className={classes.mobileTd}>{createdAt}</td>
            </tr>
            <tr>
              <th className={classes.mobileTh}>줄거리</th>
              <td className={classes.mobileTd}>{description}</td>
            </tr>
          </table>
        </>
      )}
    </>
  );
};

export default IndividualWorkDetailInfo;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DataGridStyle } from '../styles/styles';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useSelector } from 'react-redux';
//Material UI Imports
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';

const RemoveButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const columns = [
  { field: 'id', headerName: 'No', width: 60 },
  { field: 'title', headerName: '작품 제목', width: 190 },
  { field: 'genre', headerName: '장르', width: 110 },
  { field: 'madeFrom', headerName: '제작자', width: 110 },
  { field: 'runningTime', headerName: '재생 시간', width: 130 },
  { field: 'cost', headerName: '가격', width: 100 },
];

const useStyles = makeStyles((theme) => ({
  Button: {
    margin: theme.spacing(1),
  },
}));

const LikePage = () => {
  const breakPoint = useMediaQuery({
    query: '(min-width:768px)',
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const [selection, setSelection] = useState([]);
  const [myLiketList, setMyLiketList] = useState([]);
  const loginUser = useSelector((state) => state.auth.userId);

  //MyPage 좋아요 목록에 현재 로그인한 유저의 좋아요 목록 가져온다.
  const getLikeList = () => {
    const likeData = {
      userId: loginUser,
    };

    axios
      .post('/api/like/getLikes', likeData)
      .then((response) => {
        const resultLikeList = response.data.likes.map((item, index) => {
          const videoData = {
            title: item.videoId.title,
            genre: item.videoId.genre,
            madeFrom: item.videoId.nickname,
            cost: item.videoId.cost,
          };
          const minutes = Math.floor(Number(item.videoId.duration) / 60);
          const seconds = Math.floor(
            Number(item.videoId.duration) - minutes * 60
          );
          const runningTime = {
            runningTime: `${minutes ? `${minutes}분 ` : ''}${seconds}초`,
          };
          return {
            id: index + 1,
            ...videoData,
            ...runningTime,
            ...item,
          };
        });
        setMyLiketList(resultLikeList);
      })
      .catch((error) => {
        alert(
          '좋아요 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해 주세요.'
        );
      });
  };

  useEffect(() => {
    getLikeList();
  }, [loginUser]);

  //MyPage 좋아요 목록 삭제
  const handleLikeListRemove = () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      if (ok) {
        let list = [];
        myLiketList.map((item, index) => {
          selection.map((selectValue, index) => {
            if (item.id === Number(selectValue)) {
              list.push({
                userId: loginUser,
                videoId: item.videoId._id,
              });
            }
          });
        });

        let deleteData = {
          list,
        };

        axios
          .post('/api/like/unLike', deleteData)
          .then((response) => {
            if (response.data.success) {
              alert('좋아요 목록에서 삭제하였습니다.');
              getLikeList();
            } else {
              alert('삭제하는데 실패했습니다. 나중에 시도해주세요.');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  return (
    <>
      {/* 표 폰트 스타일  */}
      <DataGridStyle />
      {breakPoint ? (
        <div style={{ height: '400px', minWidth: '768px' }}>
          <DataGrid
            rows={myLiketList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid
            rows={myLiketList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      )}

      <RemoveButton
        variant="contained"
        className={classes.Button}
        startIcon={<DeleteIcon />}
        onClick={handleLikeListRemove}
        size="large"
      >
        <span>좋아요 삭제</span>
      </RemoveButton>
    </>
  );
};

export default LikePage;

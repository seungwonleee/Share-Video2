import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DataGridStyle } from '../styles/styles';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { refresh } from '../../../features/refresh/refreshSlice';
//Material UI Imports
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

const ControlButton = styled(Button)`
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

const ShoppingBasketPage = () => {
  const breakPoint = useMediaQuery({
    query: '(min-width:768px)',
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const dispatch = useDispatch();
  let history = useHistory();

  const loginUser = useSelector((state) => state.auth.userId);

  const [selection, setSelection] = useState([]);
  const [myShoppingBasketList, setMyShoppingBasketList] = useState([]);

  // 장바구니 목록 불러오기
  const loadShoppingBasketList = () => {
    const userData = {
      loginUser,
    };

    axios
      .post('/api/shoppingBasket/getShoppingBasketList', userData)
      .then((response) => {
        if (response.data.success) {
          const resultBasketList = response.data.shoppingbaskets.map(
            (item, index) => {
              const madeFrom = { madeFrom: item.madeFrom.nickname };
              const minutes = Math.floor(Number(item.duration) / 60);
              const seconds = Math.floor(Number(item.duration) - minutes * 60);
              const runningTime = {
                runningTime: `${minutes ? `${minutes}분 ` : ''}${seconds}초`,
              };
              return {
                id: index + 1,
                ...item,
                ...runningTime,
                ...madeFrom,
              };
            }
          );

          setMyShoppingBasketList(resultBasketList);
        } else {
          alert(
            '장바구니 목록을 불러오는데 실패했습니다. 나중에 시도해주세요.'
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadShoppingBasketList();
  }, []);

  //결제 페이지로 넘어가기 (장바구니에서 선택한 목록 localstorage 저장)
  const purchaseItem = () => {
    if (selection.length < 1) {
      return alert('구매하실 목록을 선택해주세요.');
    }

    let videoList = [];
    myShoppingBasketList.map((item, index) => {
      selection.map((selectValue, index) => {
        if (item.id === Number(selectValue)) {
          videoList.push(item.videoId);
        }
      });
    });

    // console.log(videoList);
    const videoListData = JSON.stringify(videoList);
    localStorage.setItem('purchaseItem', videoListData);
    history.push({
      pathname: '/payment',
      from: 'shoppingBasketPage',
    });
  };

  const handleShoppingBasketListRemove = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');

    if (ok) {
      let list = [];
      myShoppingBasketList.map((item, index) => {
        selection.map((selectValue, index) => {
          if (item.id === Number(selectValue)) {
            list.push(item);
          }
        });
      });

      let deleteData = {
        deleteList: list,
      };
      console.log(deleteData);
      axios
        .post('/api/shoppingBasket/deleteShoppingBasketList', deleteData)
        .then((response) => {
          if (response.data.success) {
            alert('장바구니 목록에서 삭제하였습니다.');
            loadShoppingBasketList();
            //새로고침용
            dispatch(refresh(1));
          } else {
            alert('삭제하는데 실패했습니다. 나중에 시도해주세요.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      {/* 표 폰트 스타일  */}
      <DataGridStyle />
      {breakPoint ? (
        <div style={{ height: '400px', minWidth: '768px' }}>
          <DataGrid
            rows={myShoppingBasketList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid
            rows={myShoppingBasketList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      )}
      <div>
        <ControlButton
          variant="contained"
          className={classes.Button}
          startIcon={<DeleteIcon />}
          onClick={handleShoppingBasketListRemove}
          size="large"
        >
          <span>장바구니 삭제</span>
        </ControlButton>
        <ControlButton
          variant="contained"
          className={classes.Button}
          color="secondary"
          startIcon={<ShoppingBasketIcon />}
          onClick={purchaseItem}
          size="large"
        >
          <span>구매하기</span>
        </ControlButton>
      </div>
    </>
  );
};

export default ShoppingBasketPage;

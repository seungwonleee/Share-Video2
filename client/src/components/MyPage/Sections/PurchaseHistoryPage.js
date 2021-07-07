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
  { field: 'genre', headerName: '장르', width: 100 },
  { field: 'madeFrom', headerName: '제작자', width: 100 },
  { field: 'runningTime', headerName: '재생 시간', width: 100 },
  {
    field: 'filePath',
    headerName: '미리보기 / 다운로드',
    width: 130,
    renderCell: (params) => (
      <a href={params.getValue('filePath')} target="_blank">
        <Button variant="contained" color="default" size="small">
          미리보기 / 다운로드
        </Button>
      </a>
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  Button: {
    margin: theme.spacing(1),
  },
}));

const PurchaseHistoryPage = () => {
  const breakPoint = useMediaQuery({
    query: '(min-width:768px)',
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const loginUser = useSelector((state) => state.auth.userId);

  const [selection, setSelection] = useState([]);
  const [purchaseList, setPurchaseList] = useState([]);

  //구매내역 가져오기
  const getPurchaseList = () => {
    const userData = {
      userId: loginUser,
    };
    axios
      .post('/api/purchaseList/getPurchaseList', userData)
      .then((response) => {
        if (response.data.success) {
          const resultBuyLists = response.data.buyLists.map((item, index) => {
            const title = { title: item.videoId.title };
            const genre = { genre: item.videoId.genre };
            const filePath = {
              filePath: `http://localhost:5000/${item.videoId.filePath}`,
            };
            const madeFrom = { madeFrom: item.videoId.nickname };
            const minutes = Math.floor(Number(item.videoId.duration) / 60);
            const seconds = Math.floor(
              Number(item.videoId.duration) - minutes * 60
            );
            const runningTime = {
              runningTime: `${minutes ? `${minutes}분 ` : ''}${seconds}초`,
            };
            return {
              id: index + 1,
              ...title,
              ...genre,
              ...filePath,
              ...item,
              ...runningTime,
              ...madeFrom,
            };
          });
          setPurchaseList(resultBuyLists);
        } else {
          alert('구매내역을 불러오는데 실패했습니다. 나중에 시도해주세요.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPurchaseList();
  }, []);

  //구매내역 삭제
  const handlePurchaseListRemove = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');

    if (ok) {
      let list = [];
      purchaseList.map((item, index) => {
        selection.map((selectValue, index) => {
          if (item.id === Number(selectValue)) {
            list.push(item);
          }
        });
      });

      let deleteData = {
        deleteList: list,
      };

      axios
        .post('/api/purchaseList/deletePurchaseList', deleteData)
        .then((response) => {
          if (response.data.success) {
            alert('구매내역에서 삭제하였습니다.');
            getPurchaseList();
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
            rows={purchaseList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid
            rows={purchaseList}
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
        onClick={handlePurchaseListRemove}
        size="large"
      >
        <span>구매내역 삭제</span>
      </RemoveButton>
    </>
  );
};

export default PurchaseHistoryPage;

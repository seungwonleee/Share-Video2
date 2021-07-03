import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataGridStyle } from "../styles/styles";
import { useSelector, useDispatch } from "react-redux";
import { refresh } from "../../../features/refresh/refreshSlice";
import { useMediaQuery } from "react-responsive";
import moment from "moment";
import "moment/locale/ko";
//Material UI Imports
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";

const RemoveButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const columns = [
  { field: "id", headerName: "No", width: 60 },
  { field: "title", headerName: "작품 제목", width: 190 },
  { field: "genre", headerName: "장르", width: 90 },
  { field: "runningTime", headerName: "재생 시간", width: 100 },
  { field: "cost", headerName: "가격", width: 100 },
  { field: "createdAt", headerName: "업로드 날짜", width: 130 },
];

const useStyles = makeStyles((theme) => ({
  Button: {
    margin: theme.spacing(1),
  },
}));

const MyIndividualWorkPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const dispatch = useDispatch();

  const loginUser = useSelector((state) => state.auth.userId);

  const [selection, setSelection] = useState([]);
  const [myVideoList, setMyVideoList] = useState([]);

  const getMyIndividualWorkList = () => {
    const userData = {
      writer: loginUser,
    };
    axios
      .post("/api/video/getMyVideos", userData)
      .then((response) => {
        if (response.data.success) {
          const resultBasketList = response.data.videos.map((item, index) => {
            const minutes = Math.floor(Number(item.duration) / 60);
            const seconds = Math.floor(Number(item.duration) - minutes * 60);
            const runningTime = {
              runningTime: `${minutes ? `${minutes}분 ` : ""}${seconds}초`,
            };
            const createdAt = {
              createdAt: moment(item.createdAt).format("LL"),
            };
            return {
              id: index + 1,
              ...item,
              ...runningTime,
              ...createdAt,
            };
          });
          setMyVideoList(resultBasketList);
        } else {
          alert("내 작품 목록을 불러오는데 실패했습니다. 나중에 시도해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMyIndividualWorkList();
  }, []);

  const handleLikeListRemove = async () => {
    if (selection.length < 1) {
      return alert("목록에서 선택하세요.");
    }
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      let list = [];
      myVideoList.map((item, index) => {
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
        .post("/api/video/deleteMyVideos", deleteData)
        .then((response) => {
          if (response.data.success) {
            alert("내 작품을 삭제하였습니다.");
            getMyIndividualWorkList();
            //새로고침용
            dispatch(refresh(1));
          } else {
            alert("삭제하는데 실패했습니다. 나중에 시도해주세요.");
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
        <div style={{ height: "400px", minWidth: "768px" }}>
          <DataGrid
            rows={myVideoList}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={myVideoList}
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
        <span>내 작품 삭제</span>
      </RemoveButton>
    </>
  );
};

export default MyIndividualWorkPage;

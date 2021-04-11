import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../../../fire_module/fireMain";
import { useMediaQuery } from "react-responsive";
//Material UI Imports
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import axios from "axios";

const RemoveButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const columns = [
  { field: "title", headerName: "작품 제목", width: 100 },
  { field: "description", headerName: "설명", width: 130 },
  { field: "genre", headerName: "장르", width: 100 },
  { field: "cost", headerName: "가격", width: 100 },
  { field: "createdAt", headerName: "업로드 날짜", width: 130 },
];

const useStyles = makeStyles((theme) => ({
  tableFont: {
    "& .MuiDataGrid-root .MuiDataGrid-mainGridContainer": {
      fontSizes: "3rem",
    },
  },
  Button: {
    margin: theme.spacing(1),
    // background: "#435ce8",
    // color: "#FFFFFF",
    // "&:hover": {
    //   background: "#4051B5",
    // },
  },
}));

const ShoppingBasketPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  const classes = useStyles();

  const [selection, setSelection] = useState([]);
  const [myShoppingBasket, setShoppingBasket] = useState([]);
  const [uid, setUid] = useState("");
  const [refDownloadUrl, setRefDownloadUrl] = useState("");

  const shoppingBasketList = async (uid) => {
    dbService
      .collection(uid)
      .doc("shoppingBasket")
      .collection(uid)
      .onSnapshot((snapshot) => {
        // console.log("실시간 데이터 변경 ===>", snapshot.docs);
        const myShoppingBasket = snapshot.docs.map((doc, index) => {
          // console.log(doc.data());
          setRefDownloadUrl(doc.data().downloadURL);
          return {
            ...doc.data(),
            id: doc.data().title,
          };
        });
        // console.log("내 작품 목록 ===> ", ...myShoppingBasket);
        setShoppingBasket([...myShoppingBasket]);
      });
  };

  const getUid = async () => {
    const uid = await axios.get("/api/users/auth").then((res) => {
      setUid(res.data.uid);
      return res.data.uid;
    });
    shoppingBasketList(uid);
  };

  useEffect(() => {
    getUid();
  }, []);

  const handleShoppingBasketListRemove = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      // firestore DB delete
      await selection.map((videoTitle) => {
        dbService
          .collection(uid)
          .doc("shoppingBasket")
          .collection(uid)
          .doc(videoTitle)
          .delete()
          .then(() => {
            console.log("삭제 성공!");
          })
          .catch((error) => {
            console.log("삭제 에러 ==> ", error);
            alert("삭제하는데 실패했습니다. 나중에 시도해 주세요.");
          });
      });
    }
  };
  return (
    <>
      {breakPoint ? (
        <div style={{ height: "400px", minWidth: "600px" }}>
          <DataGrid
            rows={myShoppingBasket}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={myShoppingBasket}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      )}
      <div>
        <RemoveButton
          variant="contained"
          className={classes.Button}
          startIcon={<DeleteIcon />}
          onClick={handleShoppingBasketListRemove}
          size="large"
        >
          <span>장바구니 삭제</span>
        </RemoveButton>
        <RemoveButton
          variant="contained"
          className={classes.Button}
          color="secondary"
          startIcon={<ShoppingBasketIcon />}
          //TODO 구매페이지로 이동해서 구매
          // onClick={handleLikeListRemove}
          size="large"
        >
          <span>구매하기</span>
        </RemoveButton>
      </div>
    </>
  );
};

export default ShoppingBasketPage;

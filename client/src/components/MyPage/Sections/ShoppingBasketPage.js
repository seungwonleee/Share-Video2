import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../../../fire_module/fireMain";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
//Material UI Imports
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import axios from "axios";

const ControlButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const columns = [
  { field: "title", headerName: "작품 제목", width: 130 },
  { field: "description", headerName: "설명", width: 130 },
  { field: "genre", headerName: "장르", width: 100 },
  { field: "cost", headerName: "가격", width: 100 },
  { field: "createdAt", headerName: "업로드 날짜", width: 130 },
];

const useStyles = makeStyles((theme) => ({
  Button: {
    margin: theme.spacing(1),
  },
}));

const ShoppingBasketPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();

  const [selection, setSelection] = useState([]);
  const [myShoppingBasket, setShoppingBasket] = useState([]);
  const [uid, setUid] = useState("");

  const shoppingBasketList = async (uid) => {
    dbService
      .collection(uid)
      .doc("shoppingBasket")
      .collection(uid)
      .onSnapshot((snapshot) => {
        // console.log("실시간 데이터 변경 ===>", snapshot.docs);
        const myShoppingBasket = snapshot.docs.map((doc, index) => {
          // console.log(doc.data());
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
    await axios.get("/api/users/auth").then((res) => {
      setUid(res.data.uid);
      shoppingBasketList(res.data.uid);
    });
  };

  useEffect(() => {
    getUid();
  }, []);

  //결제 페이지로 넘어가기 (장바구니에서 선택한 목록 localstorage 저장)
  const buyItem = () => {
    history.push("/payment");
    localStorage.setItem("buy", JSON.stringify(selection));
  };

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
        <div style={{ height: "400px", minWidth: "768px" }}>
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
          onClick={buyItem}
          size="large"
        >
          <span>구매하기</span>
        </ControlButton>
      </div>
    </>
  );
};

export default ShoppingBasketPage;

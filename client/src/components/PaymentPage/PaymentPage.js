import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import { dbService } from "../../fire_module/fireMain";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dialogState } from "../../features/dialog/dialogSlice";
import DialogMessage from "../commons/DialogMessage";
//Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import PaymentIcon from "@material-ui/icons/Payment";
//Material UI dialog Imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ControlButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;

  h1 {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontSizes.titleSize};
  }
`;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  font: {
    fontSizes: "16px",
  },
  Button: {
    margin: theme.spacing(1),
  },
  fontsize: {
    fontSize: "1.6rem !important",
  },
}));

const PaymentPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const [uid, setUid] = useState("");
  const [buyList, setBuyList] = useState([]);
  const [totalCost, setTotalCost] = useState([]);
  // console.log("buy list ===>", buyList);

  // 주문금액 총 합계
  const calculateTotalCost = (items) => {
    const costList = items.map((item, index) => {
      return item.cost;
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = costList.reduce(reducer, 0);
    setTotalCost(total);
  };

  // 구매하고자하는 아이템 title과
  const checkItem = (myShoppingBasket) => {
    //장바구니에서 구매하고자한 상품
    const selectionItems = JSON.parse(localStorage.getItem("buy"));

    const result = [];
    myShoppingBasket.map((basketItem, index) => {
      selectionItems.map((selectionItem, index) => {
        if (basketItem.title === selectionItem) {
          result.push(basketItem);
          // console.log(result);
        }
      });
    });
    setBuyList([...result]);
    calculateTotalCost(result);
  };

  const shoppingBasketList = async (uid) => {
    // await dbService
    //   .collection(uid)
    //   .doc("shoppingBasket")
    //   .collection(uid)
    //   .onSnapshot((snapshot) => {
    //     // console.log("실시간 데이터 변경 ===>", snapshot.docs);
    //     const myShoppingBasket = snapshot.docs.map((doc, index) => {
    //       // console.log(doc.data());
    //       return {
    //         ...doc.data(),
    //         id: doc.data().title,
    //       };
    //     });
    //     // console.log("내 작품 목록 ===> ", ...myShoppingBasket);
    //     // setShoppingBasket([...myShoppingBasket]);
    //     checkItem(myShoppingBasket);
    //   });
  };

  const getUid = async () => {
    // await axios.get("/api/users/auth").then((res) => {
    //   setUid(res.data.uid);
    //   shoppingBasketList(res.data.uid);
    //   // return res.data.uid;
    // });
  };

  useEffect(() => {
    // getUid();
  }, []);

  //결제 후 결제내역 DB에 저장
  const saveBuyList = async () => {
    // firestore DB save
    // await buyList.map((item) => {
    //   try {
    //     dbService
    //       .collection(uid)
    //       .doc("buyList")
    //       .collection(uid)
    //       .doc(item.title)
    //       .set(item);
    //     // showAddMessage();
    //   } catch (error) {
    //     console.log(error);
    //     alert("결제 중 문제가 발생했습니다. 나중에 시도해 주세요.");
    //   }
    // });
  };

  //결제 후 장바구니에서 삭제
  const deleteShoppingList = async () => {
    // firestore DB delete
    // await buyList.map((item) => {
    //   dbService
    //     .collection(uid)
    //     .doc("shoppingBasket")
    //     .collection(uid)
    //     .doc(item.title)
    //     .delete()
    //     .then(() => {
    //       console.log("삭제 성공!");
    //     })
    //     .catch((error) => {
    //       console.log("삭제 에러 ==> ", error);
    //       alert("결제 중 문제가 발생했습니다. 나중에 시도해 주세요.");
    //     });
    // });
  };

  const handlePayment = () => {
    //결제 후 결제내역 DB에 저장
    saveBuyList();
    //결제 후 장바구니에서 삭제
    deleteShoppingList();
    //DB 작업동안 안내 Dialog 표시
    dispatch(
      dialogState({
        dialogState: true,
        message: "결제 진행 중 입니다. 잠시만 기다려주세요.",
      })
    );
    setTimeout(() => {
      dispatch(
        dialogState({
          dialogState: false,
          message: null,
        })
      );
      //결제 완료 페이지로 이동
      history.push("/completepayment");
    }, 1300);
  };

  return (
    <>
      <Container>
        <h1>결제 페이지</h1>
        {breakPoint ? (
          <div
            style={{
              height: "400px",
              minWidth: "600px",
            }}
          >
            <TableContainer component={Paper} style={{ height: "100%" }}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>작품 제목</TableCell>
                    <TableCell>설명</TableCell>
                    <TableCell>장르</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyList.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.genre}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell> 수량: {buyList.length}개</TableCell>
                    <TableCell> 주문금액: {totalCost}원</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div style={{ height: "400px", width: "100%" }}>
            <TableContainer component={Paper} style={{ height: "100%" }}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>작품 제목</TableCell>
                    <TableCell>설명</TableCell>
                    <TableCell>장르</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyList.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.genre}</TableCell>
                      <TableCell>{row.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell> 수량: {buyList.length}개</TableCell>
                    <TableCell> 주문금액: {totalCost}원</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        )}
        {/* 결제 버튼 */}
        <ControlButton
          variant="contained"
          className={classes.Button}
          color="secondary"
          startIcon={<PaymentIcon />}
          onClick={handlePayment}
          size="large"
        >
          <span>결제하기</span>
        </ControlButton>
      </Container>
      {/* 결제 진행시 dialog */}
      <DialogMessage />
    </>
  );
};

export default PaymentPage;

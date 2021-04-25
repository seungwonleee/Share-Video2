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

  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  const [uid, setUid] = useState("");
  const [buyList, setBuyList] = useState([]);
  const [totalCost, setTotalCost] = useState([]);

  console.log("@@@@@@@@@", buyList);

  // 주문금액 총 합계
  const calculateTotalCost = (video) => {
    const costList = video.map((item, index) => {
      return item.cost;
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const total = costList.reduce(reducer, 0);
    setTotalCost(total);
  };

  //개인 작품 페이지에서 하나만 구매할 때 하나의 비디오만 불러온다.
  const getSelectVideo = () => {
    const getBuyItem = localStorage.getItem("buyItem");
    const videoId = JSON.parse(getBuyItem);

    const videoData = {
      ...videoId,
    };

    axios.post("/api/video/getVideo", videoData).then((response) => {
      if (response.data.success) {
        setBuyList([response.data.video]);
        calculateTotalCost([response.data.video]);
        localStorage.removeItem("buyItem");
      } else {
        alert("해당 상품을 불러오는데 실패했습니다. 나중에 시도해 주세요.");
      }
    });
  };

  useEffect(() => {
    //TODO 로컬 스토리지에 buyItem이 있는 경우만 결제 가능하도록 제한
    if (localStorage.getItem("buyItem")) {
      getSelectVideo();
    } else {
      alert("결제를 처음부터 다시 시도해주세요.");
      return history.push("/individualwork");
    }
  }, []);

  // 구매하고자하는 아이템 title과
  // const checkItem = (myShoppingBasket) => {
  //   //장바구니에서 구매하고자한 상품
  //   const selectionItems = JSON.parse(localStorage.getItem("buy"));

  //   const result = [];
  //   myShoppingBasket.map((basketItem, index) => {
  //     selectionItems.map((selectionItem, index) => {
  //       if (basketItem.title === selectionItem) {
  //         result.push(basketItem);
  //         // console.log(result);
  //       }
  //     });
  //   });
  //   setBuyList([...result]);
  //   calculateTotalCost(result);
  // };

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

  const messageDialog = () => {
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

  //최종적으로 videoId를 받와와 장바구니 목록에서 삭제
  const deleteShoppingList = (filterdList) => {
    const buyListData = {
      deleteList: filterdList,
    };
    axios
      .post("/api/shoppingBasket/deleteShoppingBasketList", buyListData)
      .then((response) => {
        if (response.data.success) {
          console.log("장바구니 목록에서 삭제 성공!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //사용자 장바구니 목록 불러오기
  const getShoppingBasketList = () => {
    const loginUser = {
      loginUser: userId,
    };
    axios
      .post("/api/shoppingBasket/getShoppingBasketList", loginUser)
      .then((response) => {
        let filterdList = [];
        //장바구니가 아닌 개인 작품 페이지에서 구매할 경우 사용자의 video ObjectId를 알 수 없기 때문에 사용자의 장바구니 목록을 불러온다.
        if (response.data.success) {
          response.data.shoppingbaskets.map((basketList, index) => {
            buyList.map((item, index) => {
              if (basketList.video._id === item._id) {
                filterdList.push(basketList);
              }
            });
          });
        }
        //videoId를 가진 video 목록을 가지고 장바구니 목록 삭제
        deleteShoppingList(filterdList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //결제내역 DB에 저장
  const saveBuyList = () => {
    const buyListData = {
      userId: userId,
      videoList: buyList,
    };

    axios.post("/api/buyList/saveBuyList", buyListData).then((response) => {
      if (response.data.success) {
        //DB에 구매목록 저장 후 장바구니에서 삭제
        getShoppingBasketList();
        //DB 작업동안 안내 Dialog 표시
        messageDialog();
      } else {
        return alert("결제 도중에 문제가 생겼습니다. 나중에 시도해 주세요.");
      }
    });
  };

  const handlePayment = () => {
    //결제내역 DB에 저장
    saveBuyList();
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
                    <TableCell>제작자</TableCell>
                    <TableCell>가격</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {buyList.map((row) => (
                    <TableRow key={row.title}>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>
                        {row.description.length >= 8
                          ? row.description.substr(0, 9) + "..."
                          : row.description}
                      </TableCell>
                      <TableCell>{row.genre}</TableCell>
                      <TableCell>{row.writer.nickname}</TableCell>
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

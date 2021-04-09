import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../fire_module/fireMain";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
//Material UI Components
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";

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

  nav {
    margin: 1rem;
  }
  Button {
    span {
      font-size: ${(props) => props.theme.fontSizes.small};
    }
  }
`;

const columns = [
  { field: "id", headerName: "영화 코드", width: 100 },
  { field: "movieNameEnglish", headerName: "오리지널 제목", width: 130 },
  { field: "movieNameKorean", headerName: "한국어 제목", width: 130 },
  {
    field: "voteAverage",
    headerName: "영화 평점",
    width: 130,
  },
];

const useStyles = makeStyles((theme) => ({
  tableFont: {
    "& .MuiDataGrid-root .MuiDataGrid-mainGridContainer": {
      fontSizes: "3rem",
    },
  },
  removeButton: {
    margin: theme.spacing(1),
    background: "#435ce8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#4051B5",
    },
  },
}));

const MyPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });

  const classes = useStyles();
  let history = useHistory();
  const uid = useSelector((state) => state.auth.uid);

  const [selection, setSelection] = useState([]);
  const [like, setLike] = useState([]);
  // console.log("선택목록 ====> ", selection);
  // console.log("like 목록 ====> ", like);

  useEffect(() => {
    if (uid) {
      dbService
        .collection(uid)
        .doc("like")
        .collection(uid)
        .onSnapshot((snapshot) => {
          // console.log("살시간 데이터 변경 ===>", snapshot.docs);
          const likeListData = snapshot.docs.map((doc, index) => {
            // console.log(doc.data());
            return {
              ...doc.data(),
              id: Number(doc.data().movieId),
            };
          });
          // console.log("좋아요 목록 ===> ", ...likeListData);
          setLike([...likeListData]);
        });
    } else {
      // 로그인한 유저가 아니라면 접근하지 못하도록 Redirect
      history.push("/login");
    }
  }, []);

  const handleLikeListRemove = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      // firestore DB delete
      await selection.map((movieId) => {
        dbService
          .collection(uid)
          .doc("like")
          .collection(uid)
          .doc(movieId)
          .delete()
          .then(() => {
            console.log("삭제 성공!");
          })
          .catch((error) => console.log("삭제 에러 ==> ", error));
      });
    }
  };

  return (
    <Container>
      <h1>내 정보</h1>

      {/* 목록 카테고리 */}
      <nav>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <Button>좋아요 목록</Button>
          <Button>장바구니</Button>
          <Button>구매내역</Button>
          <Button>내 작품</Button>
        </ButtonGroup>
      </nav>

      {/* 도표 */}
      {breakPoint ? (
        <div style={{ height: "400px", minWidth: "600px" }}>
          <DataGrid
            rows={like}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      ) : (
        <div style={{ height: "400px", width: "100%" }}>
          <DataGrid
            rows={like}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onSelectionModelChange={(row) => setSelection(row.selectionModel)}
          />
        </div>
      )}
      <Button
        variant="contained"
        className={classes.removeButton}
        startIcon={<DeleteIcon />}
        onClick={handleLikeListRemove}
        size="large"
      >
        <span>좋아요 삭제</span>
      </Button>
    </Container>
  );
};

export default MyPage;

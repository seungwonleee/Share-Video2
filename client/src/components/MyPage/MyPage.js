import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../fire_module/fireMain";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//Material UI Components
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";

const columns = [
  { field: "id", headerName: "영화 코드", width: 100 },
  // { field: "image", headerName: "First name", width: 130 },
  { field: "movieNameEnglish", headerName: "오리지널 제목", width: 130 },
  { field: "movieNameKorean", headerName: "한국어 제목", width: 130 },
  {
    field: "voteAverage",
    headerName: "영화 평점",
    width: 130,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
    background: "#435ce8",
    color: "#FFFFFF",
    "&:hover": {
      background: "#4051B5",
    },
  },
}));

const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.titleSize};
`;

const MyPage = () => {
  const classes = useStyles();
  let history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const uid = useSelector((state) => state.auth.uid);

  // 로그인한 유저가 아니라면 접근하지 못하도록 Redirect
  if (!isLoggedIn) {
    history.push("/");
  }

  const [visible, setVisible] = useState(false);
  const [selection, setSelection] = useState([]);
  const [like, setLike] = useState([]);
  // console.log("선택목록 ====> ", selection);
  // console.log("like 목록 ====> ", like);

  useEffect(() => {
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Title>내 정보</Title>

      <ul>
        {visible ? (
          like.map((item, index) => {
            return `<li key=${index}>${item.movieNameKorean}</li>`;
          })
        ) : (
          <></>
        )}
      </ul>

      {/* TODO 목록 카테고리 */}
      <div className={classes.root}>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <Button>좋아요 목록</Button>
          <Button>장바구니</Button>
          <Button>1:1 문의</Button>
        </ButtonGroup>
      </div>

      {/* TODO 도표 */}
      <div style={{ height: 400, width: "50%" }}>
        <DataGrid
          rows={like}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(row) => setSelection(row.selectionModel)}
        />
      </div>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleLikeListRemove}
      >
        좋아요 삭제
      </Button>
    </div>
  );
};

export default MyPage;

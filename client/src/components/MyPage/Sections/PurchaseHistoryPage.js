import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../../../fire_module/fireMain";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
//Material UI Imports
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";

const RemoveButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const columns = [
  { field: "id", headerName: "작품 제목", width: 130 },
  { field: "genre", headerName: "장르", width: 100 },
  { field: "downloadURL", headerName: "다운로드 및 스트리밍 URL", width: 390 },
  { field: "cost", headerName: "가격", width: 100 },
];

const useStyles = makeStyles((theme) => ({
  Button: {
    margin: theme.spacing(1),
  },
}));

const PurchaseHistoryPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const [selection, setSelection] = useState([]);
  const [like, setLike] = useState([]);
  const [uid, setUid] = useState("");

  const getLikeList = async (uid) => {
    dbService
      .collection(uid)
      .doc("buyList")
      .collection(uid)
      .onSnapshot((snapshot) => {
        // console.log("실시간 데이터 변경 ===>", snapshot.docs);
        const likeListData = snapshot.docs.map((doc, index) => {
          // console.log(doc.data());
          return {
            ...doc.data(),
            id: doc.data().title,
          };
        });
        // console.log("좋아요 목록 ===> ", ...likeListData);
        setLike([...likeListData]);
      });
  };

  const getUid = async () => {
    await axios.get("/api/users/auth").then((res) => {
      setUid(res.data.uid);
      getLikeList(res.data.uid);
    });
  };

  useEffect(() => {
    getUid();
  }, []);

  const handleLikeListRemove = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      // firestore DB delete
      await selection.map((videoTitle) => {
        dbService
          .collection(uid)
          .doc("buyList")
          .collection(uid)
          .doc(videoTitle)
          .delete()
          .then(() => {
            console.log("삭제 성공!");
          })
          .catch((error) => console.log("삭제 에러 ==> ", error));
      });
    }
  };

  return (
    <>
      {breakPoint ? (
        <div style={{ height: "400px", minWidth: "768px" }}>
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

      <RemoveButton
        variant="contained"
        className={classes.Button}
        startIcon={<DeleteIcon />}
        onClick={handleLikeListRemove}
        size="large"
      >
        <span>구매내역 삭제</span>
      </RemoveButton>
    </>
  );
};

export default PurchaseHistoryPage;

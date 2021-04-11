import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dbService } from "../../../fire_module/fireMain";
import { useMediaQuery } from "react-responsive";
//Material UI Components
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
  Button: {
    margin: theme.spacing(1),
    // background: "#435ce8",
    // color: "#FFFFFF",
    // "&:hover": {
    //   background: "#4051B5",
    // },
  },
}));

const LikePage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  const classes = useStyles();

  const [selection, setSelection] = useState([]);
  const [like, setLike] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(async () => {
    const uid = await axios.get("/api/users/auth").then((res) => {
      setUid(res.data.uid);
      return res.data.uid;
    });

    if (uid) {
      dbService
        .collection(uid)
        .doc("like")
        .collection(uid)
        .onSnapshot((snapshot) => {
          // console.log("실시간 데이터 변경 ===>", snapshot.docs);
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
    <>
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

      <RemoveButton
        variant="contained"
        className={classes.Button}
        startIcon={<DeleteIcon />}
        onClick={handleLikeListRemove}
        size="large"
      >
        <span>좋아요 삭제</span>
      </RemoveButton>
    </>
  );
};

export default LikePage;

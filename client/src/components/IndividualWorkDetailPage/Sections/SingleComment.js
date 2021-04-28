import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import "moment/locale/ko";
import { useHistory } from "react-router-dom";
//material ui imports
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  listItemText: {
    fontSize: "1.6rem",
  },
  nickname: {
    maxWidth: "6rem",
    width: "20%",
  },
  text: {
    width: "60%",
  },
  button: {
    width: "3%",
  },
}));

const SingleComment = ({ comment, refreshComment }) => {
  const classes = useStyles();
  let history = useHistory();
  //:videoId url을 가져온다.
  let { videoId } = useParams();
  const loginUser = useSelector((state) => state.auth.userId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [commentValue, setCommentValue] = useState("");
  const [openReply, setOpenReply] = useState(false);

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  //댓글 저장
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      if (commentValue.length === 0) {
        return alert("댓글을 작성해주세요.");
      }

      const commentData = {
        writer: loginUser,
        videoId: videoId,
        content: commentValue,
        responseTo: comment._id,
      };

      axios.post("/api/comment/saveComment", commentData).then((response) => {
        if (response.data.success) {
          setCommentValue("");
          setOpenReply(!openReply);
          refreshComment(response.data.result);
        } else {
          alert("현재 댓글을 작성할 수 없습니다. 나중에 시도해주세요.");
        }
      });
    } else {
      alert("로그인 후 사용 가능합니다.");
      history.push("/login");
    }
  };

  //대댓글 열기/닫기
  const handleReply = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={comment.writer.nickname}
            className={classes.nickname}
          />
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={comment.content}
            secondary={
              <div>
                <div style={{ fontSize: "1.2rem", padding: "1rem 0 0.3rem" }}>
                  {moment(comment.createdAt).format("LL")}
                </div>
                <span style={{ fontSize: "1.3rem" }} onClick={handleReply}>
                  {"답글쓰기"}
                </span>
                <span style={{ paddingLeft: "1rem", fontSize: "1.3rem" }}>
                  {loginUser === comment.writer._id ? "수정" : ""}
                </span>
                <span style={{ paddingLeft: "1rem", fontSize: "1.3rem" }}>
                  {loginUser === comment.writer._id ? "삭제" : ""}
                </span>
              </div>
            }
            className={classes.text}
          />
        </ListItem>

        <Divider component="li" variant="inset" />
      </List>

      {openReply && (
        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
          <textarea
            style={{ width: "100%", borderRadius: "5px", fontSize: "1.6rem" }}
            onChange={handleChange}
            value={commentValue}
            placeholder="댓글을 남겨주세요."
          />
          <br />
          <button
            style={{ width: "20%", height: "52px", fontSize: "1.6rem" }}
            onClick={handleSubmit}
          >
            답글쓰기
          </button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
//material ui imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';

const ReplyCommentContainer = styled.div`
  width: 95%;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'lightGray',
    marginLeft: '2rem',
  },
  dividerFullWidth: {
    margin: `5px 0 0 ${theme.spacing(2)}px`,
  },
  dividerInset: {
    margin: `5px 0 0 ${theme.spacing(9)}px`,
  },
  listItemText: {
    fontSize: '1.6rem',
  },
  nickname: {
    maxWidth: '6rem',
    width: '20%',
  },
  text: {
    width: '60%',
  },
  button: {
    width: '3%',
  },
}));

const ReplyComment = ({ commentLists, parentCommentId, refreshComment }) => {
  // console.log("reply", commentLists);
  const classes = useStyles();

  const loginUser = useSelector((state) => state.auth.userId);

  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;

    commentLists.map((comment, index) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [commentLists, parentCommentId]);

  const handleChange = () => {
    setOpenReplyComments(!openReplyComments);
  };

  // const removeComment = () => {
  //   console.log("reply remove!!");
  // };

  return (
    <ReplyCommentContainer>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: '1.3rem', marginLeft: '2rem' }}
          onClick={handleChange}
        >
          ⌙ {childCommentNumber}개의 답글 더보기
        </p>
      )}

      {openReplyComments &&
        commentLists.map(
          (comment, index) =>
            comment.responseTo === parentCommentId && (
              <>
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
                          <div
                            style={{
                              fontSize: '1.2rem',
                              padding: '1rem 0 0.3rem',
                            }}
                          >
                            {moment(comment.createdAt).format('LL')}
                          </div>
                          <span
                            style={{ fontSize: '1.3rem' }}
                            // onClick={removeComment}
                          >
                            {loginUser === comment.writer._id ? '삭제' : ''}
                          </span>
                        </div>
                      }
                      className={classes.text}
                    />
                  </ListItem>

                  <Divider component="li" variant="inset" />
                </List>
                <div style={{ marginBottom: '1rem' }}></div>
              </>
            )
        )}
    </ReplyCommentContainer>
  );
};

export default ReplyComment;

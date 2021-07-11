import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

const SingleComment = ({ comment, refreshComment }) => {
  const classes = useStyles();
  //:videoId url을 가져온다.
  let { videoId } = useParams();
  const loginUser = useSelector((state) => state.auth.userId);

  //댓글 삭제
  const removeComment = (event) => {
    const commentData = {
      commentId: event.currentTarget.getAttribute('_id'),
      videoId: videoId,
    };

    axios
      .post('/api/comment/removeComment', commentData)
      .then((response) => {
        alert('댓글을 삭제했습니다.');
        refreshComment(response.data.comments);
      })
      .catch((error) => {
        alert(
          '댓글을 삭제하는데 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      });
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
                <span style={{ fontSize: '1.2rem', padding: '1rem 0 0.3rem' }}>
                  {moment(comment.createdAt).format('LL')}
                </span>

                <span
                  _id={comment._id}
                  style={{
                    marginLeft: '1rem',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                  }}
                  onClick={removeComment}
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
    </div>
  );
};

export default SingleComment;

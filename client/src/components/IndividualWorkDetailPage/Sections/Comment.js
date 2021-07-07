import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const P = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  text-align: center;
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
`;

const H1 = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.xlarge};
`;

const Comment = () => {
  let history = useHistory();
  //:videoId url을 가져온다.
  let { videoId } = useParams();
  const loginUser = useSelector((state) => state.auth.userId);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [commentValue, setCommentValue] = useState('');
  const [commentLists, setCommentLists] = useState([]);

  const videoData = {
    videoId: videoId,
  };

  const getComments = () => {
    axios
      .post('/api/comment/getComments', videoData)
      .then((response) => {
        setCommentLists(response.data.comments);
      })
      .catch((error) => {
        alert('댓글을 불러오는데 실패했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };
  useEffect(() => {
    getComments();
  }, [commentLists]);

  const handleCommentText = (event) => {
    const { value } = event.currentTarget;
    setCommentValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoggedIn) {
      if (commentValue.length === 0) {
        return alert('댓글을 작성해주세요.');
      }

      const commentData = {
        content: commentValue,
        writer: loginUser,
        videoId: videoId,
      };

      axios.post('/api/comment/saveComment', commentData).then((response) => {
        if (response.data.success) {
          setCommentValue('');
          setCommentLists([...commentLists, ...response.data.result]);
        } else {
          alert(
            '댓글을 작성하는데 문제가 발생하였습닌다. 나중에 시도해주세요.'
          );
        }
      });
    } else {
      alert('로그인 후 사용 가능합니다.');
      history.push('/login');
    }
  };

  const refreshComment = (newComment) => {
    setCommentLists([...commentLists, ...newComment]);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* 작성된 댓글이 없을 때만 보이는 알림창 */}
      {commentLists.length === 0 && <P>현재 작성된 댓글이 없습니다.</P>}
      <H1>댓글</H1>

      {/* 작성한 댓글 목록 */}
      {commentLists &&
        commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <>
                <SingleComment
                  key={`singleComment-${index}`}
                  comment={comment}
                  refreshComment={refreshComment}
                />
                {/* <ReplyComment
                  key={`replyComment-${index}`}
                  commentLists={commentLists}
                  parentCommentId={comment._id}
                  refreshComment={refreshComment}
                /> */}
              </>
            )
        )}

      {/* 댓글 작성 폼 */}
      <form
        style={{ display: 'flex', marginTop: '1rem' }}
        onSubmit={handleSubmit}
      >
        <textarea
          style={{ width: '100%', borderRadius: '5px', fontSize: '1.6rem' }}
          onChange={handleCommentText}
          value={commentValue}
          placeholder="댓글을 남겨주세요."
        />
        <br />
        <button
          style={{ width: '20%', height: '52px', fontSize: '1.4rem' }}
          onClick={handleSubmit}
        >
          댓글작성
        </button>
      </form>
    </div>
  );
};

export default Comment;

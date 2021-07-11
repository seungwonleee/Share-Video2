import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCount } from '../../../features/like/likeSlice';
import axios from 'axios';

// material UI Imports
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PaymentIcon from '@material-ui/icons/Payment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const ButtonBar = ({ userFrom, video }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const shoppingBasketData = {
    videoId: video._id,
    userFrom,
    madeFrom: video.writer._id,
    userNickname: video.nickname,
    title: video.title,
    description: video.description,
    duration: video.duration,
    thumbnail: video.thumbnail,
    genre: video.genre,
    filePath: video.filePath,
    cost: video.cost,
  };

  // 장바구니 목록에 추가
  const addShoppingBasket = () => {
    if (isLoggedIn) {
      axios
        .post('/api/shoppingBasket/addShoppingBasket', shoppingBasketData)
        .then((response) => {
          if (response.data.success) {
            alert('장바구니에 담았습니다.');
          } else {
            if (response.data.message) {
              return alert('이미 장바구니에 담겼습니다.');
            }
            alert('오류가 발생했습니다. 나중에 시도해주세요.');
          }
        });
    } else {
      alert('로그인 후 사용가능 합니다.');
      history.push('/login');
    }
  };

  const likeData = {
    userId: userFrom,
    videoId: video._id,
  };

  //영상 좋아요 및 좋아요 목록에 추가
  const handleLike = () => {
    if (isLoggedIn) {
      axios
        .post('/api/like/upLike', likeData)
        .then((response) => {
          if (response.data.success) {
            alert('좋아요 했습니다.');
            dispatch(setCount(1));
          } else if (response.data.message) {
            //Like DB에서 해당 영상이 이미 좋아요한 데이터가 존재하면 unlike 하도록 한다.
            axios
              .post('/api/like/unLike', likeData)
              .then((response) => {
                alert('좋아요를 취소 했습니다.');
                dispatch(setCount(-1));
              })
              .catch((error) => {
                alert(
                  '좋아요 취소에 실패했습니다. 잠시 후 다시 시도해 주세요.'
                );
              });
          }
        })
        .catch((error) => {
          alert('좋아요에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        });
    } else {
      // 로그인하지 않은 사용자 redirect
      alert('로그인 후 사용가능 합니다.');
      history.push('/login');
    }
  };
  //영상 구매하기
  const handlePayment = () => {
    if (isLoggedIn) {
      const videoItem = JSON.stringify({ videoId: video._id });
      localStorage.setItem('purchaseItem', videoItem);
      history.push('/payment');
    } else {
      alert('로그인 후 구매 가능합니다.');
      history.push('/login');
    }
  };
  return (
    <BottomNavigation showLabels style={{ background: '#424242' }}>
      <BottomNavigationAction
        label={<span style={{ fontSize: '1.4rem' }}>좋아요</span>}
        icon={<ThumbUpAltIcon />}
        style={{ color: '#FFFFFF' }}
        onClick={handleLike}
      />
      <BottomNavigationAction
        label={<span style={{ fontSize: '1.4rem' }}>장바구니</span>}
        icon={<ShoppingBasketIcon />}
        style={{ color: '#FFFFFF' }}
        onClick={addShoppingBasket}
      />
      <BottomNavigationAction
        label={<span style={{ fontSize: '1.4rem' }}>구매하기</span>}
        icon={<PaymentIcon />}
        style={{ color: '#FFFFFF' }}
        onClick={handlePayment}
      />
    </BottomNavigation>
  );
};

export default ButtonBar;

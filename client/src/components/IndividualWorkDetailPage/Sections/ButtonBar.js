import React, { useState } from "react";
import axios from "axios";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCount } from "../../../features/like/likeSlice";

const ButtonBar = ({ userFrom, video }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const shoppingBasketData = {
    video: video._id,
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
        .post("/api/shoppingBasket/addShoppingBasket", shoppingBasketData)
        .then((response) => {
          // console.log(response);
          if (response.data.success) {
            alert("장바구니에 담았습니다.");
          } else {
            if (response.data.message) {
              return alert("이미 장바구니에 담겼습니다.");
            }
            alert("오류가 발생했습니다. 나중에 시도해주세요.");
          }
        });
    } else {
      alert("로그인 후 사용가능 합니다.");
      history.push("/login");
    }
  };

  const likeData = {
    userId: userFrom,
    videoId: video._id,
  };

  const handleLike = () => {
    axios.post("/api/like/upLike", likeData).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("좋아요 했습니다.");
        dispatch(setCount(1));
      } else if (response.data.message) {
        //upLike 에서 해당 영상이 이미 좋아요한 목록에 있으면 unlike 하도록 한다.
        axios.post("/api/like/unLike", likeData).then((response) => {
          if (response.data.success) {
            alert("좋아요를 취소 했습니다.");
            dispatch(setCount(-1));
          } else {
            alert("좋아요 취소를 실패 했습니다. 나중에 시도해주세요.");
          }
        });
      } else {
        alert("좋아요를 실패 했습니다. 나중에 시도해주세요.");
      }
    });
  };
  return (
    <BottomNavigation showLabels style={{ background: "#424242" }}>
      <BottomNavigationAction
        label="좋아요"
        //   component={Link}
        //   to={`/individualwork/${_id}`}
        icon={<ThumbUpAltIcon />}
        style={{ color: "#FFFFFF" }}
        onClick={handleLike}
      />
      <BottomNavigationAction
        label="장바구니"
        icon={<ShoppingBasketIcon />}
        style={{ color: "#FFFFFF" }}
        onClick={addShoppingBasket}
      />
      <BottomNavigationAction
        label="구매하기"
        icon={<PaymentIcon />}
        style={{ color: "#FFFFFF" }}
      />
    </BottomNavigation>
  );
};

export default ButtonBar;

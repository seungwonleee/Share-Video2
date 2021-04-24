import React from "react";
import axios from "axios";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

const ButtonBar = ({ userTo, userFrom, video }) => {
  // console.log("=====>", video);
  // console.log("=====>", userFrom);
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
  };
  return (
    <BottomNavigation showLabels style={{ background: "#424242" }}>
      <BottomNavigationAction
        label="좋아요"
        //   component={Link}
        //   to={`/individualwork/${_id}`}
        icon={<ThumbUpAltIcon />}
        style={{ color: "#FFFFFF" }}
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

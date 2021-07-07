import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
//Import MyPage Navigation
import LikePage from './Sections/LikePage';
import ShoppingBasketPage from './Sections/ShoppingBasketPage';
import PurchaseHistoryPage from './Sections/PurchaseHistoryPage';
import MyIndividualWorkPage from './Sections/MyIndividualWorkPage';
// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -10,
    top: 2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;

  h1 {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontSizes.titleSize};
  }

  nav {
    margin: 1rem;
  }
`;
const NavButton = styled(Button)`
  span {
    font-size: ${(props) => props.theme.fontSizes.small};
  }
`;

const MyPage = () => {
  const [title, setTitle] = useState('좋아요 목록');
  const [visible, setVisible] = useState({
    likeVisible: true,
  });
  const [shoppingBasketCount, setShoppingBasketCount] = useState(0);

  const loginUser = useSelector((state) => state.auth.userId);
  const refresh = useSelector((state) => state.refresh.count);

  const userData = {
    loginUser,
  };

  const loadShoppingBasketList = () => {
    axios
      .post('/api/shoppingBasket/getShoppingBasketList', userData)
      .then((response) => {
        if (response.data.success) {
          const resultBasketList = response.data.shoppingbaskets.map(
            (item, index) => {
              const madeFrom = { madeFrom: item.madeFrom.nickname };
              const minutes = Math.floor(Number(item.duration) / 60);
              const seconds = Math.floor(Number(item.duration) - minutes * 60);
              const runningTime = {
                runningTime: `${minutes ? `${minutes}분 ` : ''}${seconds}초`,
              };
              return {
                id: index + 1,
                ...item,
                ...runningTime,
                ...madeFrom,
              };
            }
          );
          setShoppingBasketCount(resultBasketList.length);
        } else {
          alert(
            '장바구니 목록을 불러오는데 실패했습니다. 나중에 시도해주세요.'
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadShoppingBasketList();
  }, [loginUser, refresh]);

  const handleVisible = (event) => {
    // 새로고침시 likeVisible state 값이 true 이기때문에 좋아요 목록으로 고정된다.
    switch (event.currentTarget.name) {
      case 'like':
        setVisible({
          likeVisible: true,
          shoppingBasketVisible: false,
          purchaseHistoryVisible: false,
          myIndividualWorkVisible: false,
        });
        setTitle('좋아요 목록');
        break;
      case 'shoppingBasket':
        setVisible({
          likeVisible: false,
          shoppingBasketVisible: true,
          purchaseHistoryVisible: false,
          myIndividualWorkVisible: false,
        });
        setTitle('장바구니');
        break;
      case 'purchaseHistory':
        setVisible({
          likeVisible: false,
          shoppingBasketVisible: false,
          purchaseHistoryVisible: true,
          myIndividualWorkVisible: false,
        });
        setTitle('구매내역');
        break;
      case 'myIndividualWork':
        setVisible({
          likeVisible: false,
          shoppingBasketVisible: false,
          purchaseHistoryVisible: false,
          myIndividualWorkVisible: true,
        });
        setTitle('내 작품');
        break;
      //default를 작성하지 않아도 되지만 eslint로인해 생기는 노란줄 표시를 지우고자 작성함
      default:
        break;
    }
  };

  return (
    <Container>
      <h1>{`My Page(${title})`}</h1>

      {/* 목록 카테고리 */}
      <nav>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <NavButton name="like" onClick={handleVisible}>
            <span>좋아요 목록</span>
          </NavButton>
          <NavButton name="shoppingBasket" onClick={handleVisible}>
            {shoppingBasketCount ? (
              <StyledBadge badgeContent={shoppingBasketCount} color="secondary">
                <span>장바구니</span>
              </StyledBadge>
            ) : (
              <span>장바구니</span>
            )}
          </NavButton>
          <NavButton name="purchaseHistory" onClick={handleVisible}>
            <span>구매내역</span>
          </NavButton>
          <NavButton name="myIndividualWork" onClick={handleVisible}>
            <span>내 작품</span>
          </NavButton>
        </ButtonGroup>
      </nav>

      {/* 데이터 테이블 */}
      {visible.likeVisible && <LikePage />}
      {visible.shoppingBasketVisible && <ShoppingBasketPage />}
      {visible.purchaseHistoryVisible && <PurchaseHistoryPage />}
      {visible.myIndividualWorkVisible && <MyIndividualWorkPage />}
    </Container>
  );
};

export default MyPage;

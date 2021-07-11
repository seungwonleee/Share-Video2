import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import DescriptionIcon from '@material-ui/icons/Description';
import PaymentIcon from '@material-ui/icons/Payment';

// styled-components
const Text = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xsmall};
`;

const ThumnailImage = styled.img`
  width: 320px;
  height: 240px;
`;

const VideoDurationWrapper = styled.div`
  bottom: 0;
  right: 0;
  position: absolute;
  margin: 1rem;
  padding: 0.5rem;
  background: #000000;
  color: #ffffff;
  border-radius: 5px;
  line-height: 1rem;
  span {
    font-size: 1.4rem;
  }
`;

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: '100%',
  },
  media: {
    // height: 250,
    paddingTop: '56.25%', // 16:9
  },
  img: {
    width: '100%',
    height: '320px',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const IndividualWork = ({
  _id,
  title,
  thumbnail,
  genre,
  writer,
  cost,
  createdAt,
  description,
  duration,
  filePath,
  madeFrom,
}) => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();
  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  // 장바구니 목록에 추가
  const addShoppingBasket = () => {
    const shoppingBasketData = {
      videoId: _id,
      userFrom: userId,
      madeFrom: madeFrom,
      userNickname: userNickname,
      title: title,
      description: description,
      duration: duration,
      thumbnail: thumbnail,
      genre: genre,
      filePath: filePath,
      cost: cost,
    };

    if (isLoggedIn) {
      axios
        .post('/api/shoppingBasket/addShoppingBasket', shoppingBasketData)
        .then((response) => {
          if (response.data.success) {
            return alert('장바구니에 담았습니다.');
          } else {
            return alert('이미 장바구니에 담겼습니다.');
          }
        })
        .catch((error) => {
          alert(
            '장바구니 담기에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
          );
        });
    } else {
      alert('로그인 후 사용 가능합니다.');
      history.push('/login');
    }
  };

  const handlePayment = () => {
    if (isLoggedIn) {
      const videoItem = JSON.stringify({ videoId: _id });
      localStorage.setItem('purchaseItem', videoItem);
      history.push('/payment');
    } else {
      alert('로그인 후 구매 가능합니다.');
      history.push('/login');
    }
  };

  const handleViews = () => {
    const data = { videoId: _id };
    axios
      .post('/api/video/updateViews', data)
      .then((response) => {
        console.log('죄회수 증가');
      })
      .catch((error) => {
        console.error(error);
        console.log('조회수 증가 오류 발생');
      });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.center}>
      <Card className={classes.root}>
        <CardMedia onClick={handleViews}>
          <div style={{ position: 'relative' }}>
            <a href={`/individualwork/${_id}`}>
              <ThumnailImage src={thumbnail} alt={`thumbnail-${title}`} />
            </a>
            <VideoDurationWrapper>
              <span>{`${minutes} : ${seconds}`}</span>
            </VideoDurationWrapper>
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <Text>제목: {title}</Text>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Text>장르: {genre}</Text>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Text>제작자: {writer}</Text>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Text>가격: {cost} 원</Text>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Text>업로드: {moment({ createdAt }).format('LL')}</Text>
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="상세보기"
            component={Link}
            to={`/individualwork/${_id}`}
            icon={<DescriptionIcon />}
            onClick={handleViews}
          />
          <BottomNavigationAction
            label="장바구니"
            icon={<ShoppingBasketIcon />}
            onClick={addShoppingBasket}
          />
          <BottomNavigationAction
            label="구매하기"
            icon={<PaymentIcon />}
            onClick={handlePayment}
          />
        </BottomNavigation>
      </Card>
    </Grid>
  );
};

export default IndividualWork;

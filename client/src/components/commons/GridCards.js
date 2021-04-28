import React from "react";
import styled from "styled-components";
import noImage from "../../images/No_image.svg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { dialogState } from "../../features/dialog/dialogSlice";
import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
// Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import DescriptionIcon from "@material-ui/icons/Description";
import PaymentIcon from "@material-ui/icons/Payment";

// styled-components
const Image = styled.img`
  width: 100%;
  height: 320px;
`;

const Text = styled.span`
  font-size: ${(props) => props.theme.fontSizes.xsmall};
`;

// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "100%",
  },
  media: {
    // height: 250,
    paddingTop: "56.25%", // 16:9
  },
  img: {
    width: "100%",
    height: "320px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const GridCards = ({
  // movie, movieDetail 관련 props
  landingPage,
  castList,
  image,
  movieId,
  movieNameEnglish,
  movieNameKorean,
  voteAverage,
  castName,
  character,
  //individualWork 관련 props
  individualWork,
  title,
  description,
  createdAt,
  genre,
  cost,
  duration,
  writer,
  thumbnail,
  _id,
  filePath,
  madeFrom,
}) => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (landingPage) {
    //사용자 식별 uid 와 좋아요 누른 항목 DB에 저장
    const addLikeItem = async () => {
      //로그인 하지 않은 사용자는 장바구니 기능x
      // if (!uid) {
      //   alert("로그인 후 사용 가능합니다.");
      //   history.push("/login");
      //   return;
      // }
      // await dbService
      //   .collection(uid)
      //   .doc("like")
      //   .collection(uid)
      //   .doc(movieId)
      //   .set({
      //     movieId,
      //     image,
      //     movieNameKorean,
      //     movieNameEnglish,
      //     voteAverage,
      //     createdAt: Date.now(),
      //   });

      // 좋아요 (like) 목록에 추가 dialog 안내 후 Dialog 제거
      dispatch(
        dialogState({
          dialogState: true,
          message: "좋아요 목록에 추가했습니다.",
        })
      );
      setTimeout(() => {
        dispatch(
          dialogState({
            dialogState: false,
            message: null,
          })
        );
      }, 1300);
    };

    // clipboard 복사 및 클립보드 복사 안내 후 Dialog 제거
    const copyMovieTitle = (event) => {
      const { name } = event.currentTarget;
      const movieTitle = name;
      navigator.clipboard.writeText(movieTitle);

      dispatch(
        dialogState({
          dialogState: true,
          message: "제목을 클립보드에 복사했습니다.",
        })
      );
      setTimeout(() => {
        dispatch(
          dialogState({
            dialogState: false,
            message: null,
          })
        );
      }, 1300);
    };

    return (
      // 인기 영화 목록 Grid Cards (LandingPage)
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.center}>
        <Card className={classes.root}>
          <a href={`/movie/${movieId}`}>
            <CardMedia>
              <Image src={image ? image : noImage} />
            </CardMedia>
          </a>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <Text>{movieNameKorean}</Text> <br />{" "}
              <Text>({movieNameEnglish})</Text>
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* 좋아요 목록 추가 버튼  */}
              <IconButton aria-label="add to favorites" onClick={addLikeItem}>
                <FavoriteIcon />
              </IconButton>
              {/* 영화 예고편 youtube list 로 이동 버튼  * Youtube API 호출 가능 횟수가 적어서 대체 */}
              <a
                href={`https://www.youtube.com/results?search_query=${movieNameKorean} 공식 예고편`}
                target="_blank"
              >
                <IconButton aria-label="share">
                  <PlayCircleOutlineIcon />
                </IconButton>
              </a>
              {/* clipboard 제목 복사 버튼 */}
              <IconButton
                aria-label="share"
                className="share"
                name={movieNameKorean}
                onClick={copyMovieTitle}
              >
                <ShareIcon />
              </IconButton>
            </div>
            <div>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ paddingRight: "1rem" }}
              >
                <Text>평점: {voteAverage}</Text>
              </Typography>
            </div>
          </CardActions>
        </Card>
      </Grid>
    );
  } else if (castList) {
    return (
      // 출연진 목록 Grid Cards (MovieDetialPage)
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.center}>
        <Card className={classes.root}>
          <CardMedia>
            <Image src={image ? image : noImage} />
          </CardMedia>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <Text>등장인물: {character}</Text>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <Text>본명: {castName}</Text>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  } else if (individualWork) {
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
          .post("/api/shoppingBasket/addShoppingBasket", shoppingBasketData)
          .then((response) => {
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
        alert("로그인 후 사용 가능합니다.");
        history.push("/login");
      }
    };

    const handlePayment = () => {
      if (isLoggedIn) {
        const videoItem = JSON.stringify({ videoId: _id });
        localStorage.setItem("purchaseItem", videoItem);
        history.push("/payment");
      } else {
        alert("로그인 후 구매 가능합니다.");
        history.push("/login");
      }
    };

    return (
      // 개인 작품 목록 Grid Cards (IndividualWorkPage)
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.center}>
        <Card className={classes.root}>
          <CardMedia>
            <div style={{ position: "relative" }}>
              <a href={`/individualwork/${_id}`}>
                <img
                  src={`http://localhost:5000/${thumbnail}`}
                  alt={`thumbnail-${title}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </a>
              <div
                style={{
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  margin: "1rem",
                  padding: "0.5rem",
                  background: "black",
                  color: "#FFFFFF",
                  borderRadius: "5px",
                  lineHeight: "1rem",
                }}
              >
                <span
                  style={{ fontSize: "1.4rem" }}
                >{`${minutes} : ${seconds}`}</span>
              </div>
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
              <Text>업로드: {moment({ createdAt }).format("LL")}</Text>
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
  }
};
export default GridCards;

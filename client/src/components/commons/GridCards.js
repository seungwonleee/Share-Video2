import React from "react";
import styled from "styled-components";
import noImage from "../../images/No_image.svg";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { dialogState } from "../../features/dialog/dialogSlice";
import moment from "moment";
import "moment/locale/ko";
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
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

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
  views,
  downloadPath,
  thumbnail,
  _id,
}) => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.uid);

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
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
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
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
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

    // 장바구니에 상품을 담으면 Dialog 안내 후 Dialog 제거
    const showAddMessage = () => {
      dispatch(
        dialogState({
          dialogState: true,
          message: "장바구니에 상품을 담았습니다.",
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

    // 장바구니에 추가 (fireStore에 저장)
    const addShoppingbasket = async () => {
      //로그인 하지 않은 사용자는 장바구니 기능x
      // if (!uid) {
      //   alert("로그인 후 사용 가능합니다.");
      //   history.push("/login");
      //   return;
      // }
      // try {
      //   await dbService
      //     .collection(uid)
      //     .doc("shoppingBasket")
      //     .collection(uid)
      //     .doc(title)
      //     .set({
      //       title,
      //       description,
      //       genre,
      //       cost,
      //       creatorUid,
      //       email,
      //       createdAt,
      //       downloadURL,
      //     });
      //   //dialog 메세지
      //   showAddMessage();
      // } catch (error) {
      //   console.log(error);
      //   alert("장바구니에 추가하는데 실패했습니다. 나중에 시도해 주세요.");
      // }
    };
    return (
      // 개인 작품 목록 Grid Cards (IndividualWorkPage)
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.center}>
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
              <Text>업로드: {moment({ createdAt }).format("LL")}</Text>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
            ></Typography>
          </CardContent>
          <div style={{ textAlign: "center", margin: "1rem" }}>
            <Button
              variant="contained"
              style={{ margin: "0.5rem" }}
              onClick={addShoppingbasket}
            >
              <Text>상세보기</Text>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "0.5rem" }}
            >
              <a
                // href={downloadURL}
                style={{
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PlayCircleOutlineIcon />
                <p style={{ paddingLeft: "0.5rem", fontSize: "1.4rem" }}>
                  예고편
                </p>
              </a>
            </Button>
          </div>
        </Card>
      </Grid>
    );
  }
};
export default GridCards;

import React from 'react';
import styled from 'styled-components';
import noImage from '../../../images/No_image.svg';
import { useDispatch } from 'react-redux';
import { dialogState } from '../../../features/dialog/dialogSlice';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

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

const LandingPage = ({
  movieId,
  image,
  movieNameKorean,
  movieNameEnglish,
  voteAverage,
}) => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  const dispatch = useDispatch();

  // clipboard 복사시 클립보드 복사 안내 Dialog
  const copyMovieTitle = (event) => {
    const { name } = event.currentTarget;
    const movieTitle = name;

    let textField = document.createElement('textarea');
    textField.innerText = movieTitle;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    dispatch(
      dialogState({
        dialogState: true,
        message: '제목을 클립보드에 복사했습니다.',
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
            <Text>{movieNameKorean}</Text> <br />
            <Text>({movieNameEnglish})</Text>
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
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
              <FileCopyIcon />
            </IconButton>
          </div>
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ paddingRight: '1rem' }}
            >
              <Text>평점: {voteAverage}</Text>
            </Typography>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default LandingPage;

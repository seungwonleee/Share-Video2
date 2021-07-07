import React from 'react';
import styled from 'styled-components';
import noImage from '../../../images/No_image.svg';
// Material UI Imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CastList = ({ image, character, castName }) => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

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
};

export default CastList;

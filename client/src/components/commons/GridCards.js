import React from 'react';
import LandingPage from './gridCard/LandingPage';
import CastList from './gridCard/CastList';
import IndividualWork from './gridCard/IndividualWork';

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
  // individualWork 관련 props
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
  if (landingPage) {
    return (
      // 인기 영화 목록 Grid Cards (LandingPage)
      <LandingPage
        movieId={movieId}
        image={image}
        movieNameKorean={movieNameKorean}
        movieNameEnglish={movieNameEnglish}
        voteAverage={voteAverage}
      />
    );
  } else if (castList) {
    return (
      // 출연진 목록 Grid Cards (MovieDetialPage)
      <CastList image={image} character={character} castName={castName} />
    );
  } else if (individualWork) {
    return (
      // 개인 작품 목록 Grid Cards (IndividualWorkPage)
      <IndividualWork
        _id={_id}
        title={title}
        thumbnail={thumbnail}
        genre={genre}
        writer={writer}
        cost={cost}
        createdAt={createdAt}
        description={description}
        duration={duration}
        filePath={filePath}
        madeFrom={madeFrom}
      />
    );
  }
};
export default GridCards;

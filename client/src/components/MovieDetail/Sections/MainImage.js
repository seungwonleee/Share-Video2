import React from 'react';
import styled from 'styled-components';

const MoviePoster = styled.div`
  /* background: url(${(props) => props.image}); */
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  position: relative; ;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const MovieSummary = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
  color: white;
  h2 {
    font-size: ${(props) => props.theme.fontSizes.titleSize};
  }
  h3 {
    font-size: ${(props) => props.theme.fontSizes.xlarge};
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.base};
  }
`;

const MainImage = ({ image, titleEnglish, titleKorean, overview }) => {
  return (
    <MoviePoster>
      <Image src={image} />
      <div>
        <MovieSummary>
          <h2>{titleKorean}</h2>
          <h3>({titleEnglish})</h3>
        </MovieSummary>
      </div>
    </MoviePoster>
  );
};

export default MainImage;

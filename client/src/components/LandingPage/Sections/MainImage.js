import React from "react";
import styled from "styled-components";

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
`;

const MainImage = ({ image, titleEnglish, titleKorean, text }) => {
  return (
    <MoviePoster>
      <Image src={image} />
      <div>
        <MovieSummary>
          <h2>{titleKorean}</h2>
          <p>({titleEnglish})</p>
          <br />
          <p>{text}</p>
        </MovieSummary>
      </div>
    </MoviePoster>
  );
};

export default MainImage;

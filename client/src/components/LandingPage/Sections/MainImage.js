import React from "react";
import styled from "styled-components";

const MoviePoster = styled.div`
  background: url(${(props) => props.image});
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  position: relative; ;
`;

const MovieSummary = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 2rem;
  margin-left: 2rem;
  color: white;
`;

const MainImage = ({ image, title, text }) => {
  return (
    <MoviePoster image={image}>
      <div>
        <MovieSummary>
          <h2>{title}</h2>
          <p>{text}</p>
        </MovieSummary>
      </div>
    </MoviePoster>
  );
};

export default MainImage;

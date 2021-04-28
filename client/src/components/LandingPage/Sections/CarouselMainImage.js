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
  height: 480px;
`;

const MovieSummary = styled.div`
  position: absolute;
  max-width: 500px;
  bottom: 5rem;
  margin-left: 3rem;
  color: white;
  h2 {
    font-size: ${(props) => props.theme.fontSizes.xxxlarge};
  }
  h3 {
    font-size: ${(props) => props.theme.fontSizes.base};
  }
`;

const CarouselMainImage = ({ image, title, original_title, overview }) => {
  return (
    <MoviePoster>
      <Image src={image} alt={title} />
      <MovieSummary>
        <h2>{title}</h2>
        <h3>({original_title})</h3>
      </MovieSummary>
    </MoviePoster>
  );
};

export default CarouselMainImage;

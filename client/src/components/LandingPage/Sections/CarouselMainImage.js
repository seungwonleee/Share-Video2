import React from "react";

const CarouselMainImage = ({ image, name }) => {
  return (
    <>
      <img src={image} style={{ width: "100%", height: "480px" }} alt={name} />
    </>
  );
};

export default CarouselMainImage;

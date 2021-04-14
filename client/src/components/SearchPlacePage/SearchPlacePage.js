import React, { useState } from "react";
import styled from "styled-components";
import KakaoMap from "./KakaoMap";
import SearchIcon from "@material-ui/icons/Search";

const Container = styled.div`
  background: #2a2d2e;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 3rem;
`;

const Input = styled.input`
  width: 60%;
  height: 3rem;
  font-size: ${(props) => props.theme.fontSizes.base};
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 1rem;
`;

const Button = styled.button`
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchPlacePage = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <Container>
      <Form className="inputForm" onSubmit={handleSubmit}>
        <Input
          placeholder="장소를 검색하세요."
          onChange={onChange}
          value={inputText}
        />
        <Button type="submit">
          <SearchIcon fontSize="large" />
        </Button>
      </Form>
      <MapContainer>
        <KakaoMap searchPlace={place} />
      </MapContainer>
    </Container>
  );
};

export default SearchPlacePage;

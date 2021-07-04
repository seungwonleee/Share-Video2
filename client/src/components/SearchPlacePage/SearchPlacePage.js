import React, { useState } from "react";
import styled from "styled-components";
import KakaoMap from "./KakaoMap";
// Material UI Imports
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";

const SearchPlace = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#A5292A",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#A5292A",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#A5292A",
      },
      "&:hover fieldset": {
        borderColor: "#A5292A",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#A5292A",
      },
    },
    width: "60%",
    height: "3rem",
  },
})(TextField);

const PageContainer = styled.div`
  background: #2a2d2e;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  padding: 3rem;
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
    <PageContainer>
      <Form className="inputForm" onSubmit={handleSubmit}>
        <SearchPlace
          autoFocus
          placeholder="지역명 + 영화관으로 검색하세요."
          onChange={onChange}
          value={inputText}
          InputProps={
            ({
              endAdornment: (
                <InputAdornment>
                  <IconButton type="submit">
                    <SearchIcon fontSize="large" />
                  </IconButton>
                </InputAdornment>
              ),
            },
            {
              style: {
                fontSize: "1.6rem",
                color: "white",
                fontFamily: "sans-serif",
              },
            })
          }
        />
      </Form>
      <MapContainer>
        <KakaoMap searchPlace={place} />
      </MapContainer>
    </PageContainer>
  );
};

export default SearchPlacePage;

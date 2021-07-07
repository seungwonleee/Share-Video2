import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding:0;
    margin:0;
    font-size:10px;
  }
  html, body {
    height:100%;
    width:100%;
    background:#f7f7f7;
  }
  a {
    text-decoration:none;
    color: #73797a;
  }
`;

export default GlobalStyle;

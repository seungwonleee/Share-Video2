// *** 중요 ***
// * 전체 선택자에 font-size: 10px; 설정해두어야 한다. 이처럼 설정해두면 아래와 같이 사용할 수 있다.
// * 10px ==> 1rem / 14px ==> 1.4rem

const fontSizes = {
  xsmall: '1.2rem',
  small: '1.4rem',
  base: '1.6rem',
  large: '1.8rem',
  xlarge: '2.0rem',
  xxlarge: '2.2rem',
  xxxlarge: '2.4rem',
  titleSize: '3.4rem',
};

const paddings = {
  xsmall: '0.5rem',
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const margins = {
  small: '0.8rem',
  base: '1rem',
  large: '1.2rem',
  xlarge: '1.4rem',
  xxlarge: '1.6rem',
  xxxlarge: '1.8rem',
};

const interval = {
  small: '2.5rem',
  base: '5rem',
  large: '10rem',
  xlarge: '15',
  xxlarge: '20rem',
  xxxlarge: '25rem',
};

const verticalInterval = {
  base: `10rem 0 1rem 0`,
};

const colors = {
  green: '#03C75A',
  hover: '#11a653',
  link: '#73797a',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#767676',
  DarkMode: '#222222',
};

const deviceSizes = {
  // min-width 기준
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px',
  //material ui 기준 break-point
  // value         |0px     600px    960px    1280px   1920px
  // key           |xs      sm       md       lg       xl
  // screen width  |--------|--------|--------|--------|-------->
  // range         |   xs   |   sm   |   md   |   lg   |   xl
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export default theme;

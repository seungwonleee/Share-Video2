import { createGlobalStyle } from 'styled-components';

//Data-Grid 표 글씨 크기
export const DataGridStyle = createGlobalStyle`
  //첫 행 제목
  .MuiDataGrid-colCellTitle {
    font-size: ${(props) => props.theme.fontSizes.xsmall}
  }
  .MuiDataGrid-cell {
    font-size: ${(props) => props.theme.fontSizes.xsmall}
  }
`;

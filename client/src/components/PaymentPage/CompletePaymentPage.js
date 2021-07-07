import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  h1 {
    font-size: ${(props) => props.theme.fontSizes.titleSize};
    padding: 2rem;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.base};
    padding: 1rem;
  }
`;
const CompletePaymentPage = () => {
  return (
    <Container>
      <h1>결제가 완료되었습니다.😃</h1>

      <p>내 정보 → 구매내역에서 구매내역이 제공되며</p>
      <p>구매내역을 통해 영상 시청 및 다운로드 URL을 제공합니다.</p>
    </Container>
  );
};

export default CompletePaymentPage;

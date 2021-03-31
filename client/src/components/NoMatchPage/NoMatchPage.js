import React from "react";
import styled from "styled-components";

const NoMatchErrorMessage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InformTextAccent = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

const InformText = styled.p`
  font-size: 1.6rem;
`;

const NoMatchPage = () => {
  return (
    <NoMatchErrorMessage>
      <div>
        <InformTextAccent>죄송합니다.</InformTextAccent>
        <InformTextAccent>요청하신 페이지를 찾을 수 없습니다.</InformTextAccent>
        <br />
        <br />
        <InformText>
          방문하시려는 페이지의 주소가 잘못 입력되었거나,
        </InformText>{" "}
        <InformText>
          페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        </InformText>
        <br />
        <br />
        <InformText>
          입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </InformText>{" "}
        <InformText>
          관련 문의사항은 고객센터에 알려주시면 친절하게 안내해 드리겠습니다.
        </InformText>
        <br />
        <br />
        <InformText>감사합니다.</InformText>
      </div>
    </NoMatchErrorMessage>
  );
};

export default NoMatchPage;

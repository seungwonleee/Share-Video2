import React, { useEffect } from "react";
import styled from "styled-components";

const MapConTainer = styled.div`
  width: 90%;
  height: 80vh;
  border: 1px soild black;
`;

// **** 중요 빼먹지 말고 작성하기 ****
const { kakao } = window;

const KakaoMap = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("map");
    const KOREA_CAPITAL_LAT = 37.566536;
    const KOREA_CAPITAL_LONG = 126.977966;

    const options = {
      center: new kakao.maps.LatLng(KOREA_CAPITAL_LAT, KOREA_CAPITAL_LONG),
      level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    // 첫번째 인자로 searchPlace 검색어 텍스트 넘겨주기
    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);
  return (
    <>
      <MapConTainer id="map"></MapConTainer>
    </>
  );
};

export default KakaoMap;

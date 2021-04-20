import React, { useState } from "react";
import Dropzone from "react-dropzone";
// import { dbService, storageService } from "../../fire_module/fireMain";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
// Material UI Imports
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const Section = styled.section`
  max-width: 700px;
  margin: 2rem auto;
  height: 80vh;
`;

const Title = styled.div`
  text-align: center;
  margin: 2rem;
  h1 {
    font-size: ${(props) => props.theme.fontSizes.titleSize};
  }
`;

const DropzoneBox = styled.div`
  width: 300px;
  height: 240px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    background: black;
    width: 300px;
    height: 240px;
  }
  video {
    width: 300px;
    height: 240px;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.base};
  }
`;

const VideoDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;
  label {
    margin-top: 2rem;
    font-size: ${(props) => props.theme.fontSizes.base};
    margin: 0 2rem;
  }
  input {
    height: 3rem;
    font-size: ${(props) => props.theme.fontSizes.base};
    border: solid 1px lightgray;
    margin: 0 2rem;
    &:focus {
      transition: 0.5s;
      outline: none;
      border: solid 1px #a5292a;
    }
  }
  textArea {
    height: 6rem;
    font-size: ${(props) => props.theme.fontSizes.base};
    border: solid 1px lightgray;
    margin: 0 2rem;
    &:focus {
      transition: 0.5s;
      outline: none;
      border: solid 1px #a5292a;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }
  select {
    height: 3rem;
    font-size: ${(props) => props.theme.fontSizes.base};
    border: solid 1px lightgray;
    margin: 0 2rem;
    &:focus {
      transition: 0.5s;
      outline: none;
      border: solid 1px #a5292a;
    }
  }
  Button {
    margin: 3rem 2rem;
    span {
      font-size: ${(props) => props.theme.fontSizes.base};
    }
  }
`;

//장르 목록
const Catogory = [
  { label: "" },
  { label: "코미디" },
  { label: "애니메이션" },
  { label: "액션" },
  { label: "음악" },
  { label: "동물" },
  { label: "스포츠" },
  { label: "멜로" },
  { label: "SF" },
  { label: "가족" },
];

const VideoUploadPage = () => {
  const breakPoint = useMediaQuery({
    query: "(min-width:768px)",
  });
  let history = useHistory();

  //현재 로그인한 회원 정보
  const uid = useSelector((state) => state.auth.uid);
  const email = useSelector((state) => state.auth.email);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [cost, setCost] = useState("");

  // 미리보기
  const [preview, setPreview] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDecsription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangeCategory = (event) => {
    setGenre(event.currentTarget.value);
  };

  const handleChangeCost = (event) => {
    // console.log(event.currentTarget.value);
    //숫자만 입력 가능
    setCost(Number(event.currentTarget.value.replace(/[^0-9]/g, "")));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      title === "" ||
      description === "" ||
      genre === "" ||
      cost === "" ||
      preview === ""
    ) {
      return alert("모든 항목을 입력해주세요.");
    }

    //해당 계정으로 업로드한 영상의 수가 2개가 넘으면 못올리게 제어
    // const count = await storageService.ref().child(uid).listAll();
    // console.log(count._delegate.items.length);
    // if (count._delegate.items.length >= 3) {
    //   return alert("영상은 최대 2개까지 공유할 수 있습니다.");
    // }

    //영상 업로드 (Firebase Sotrage 와 FireStore DB에 영상 정보 저장)
    // try {
    //   const fileRef = storageService.ref().child(`${uid}/${title}`);
    //   const response = await fileRef.putString(preview, "data_url");
    //   // console.log("업로드 결과", response);
    //   const downloadURL = await response.ref.getDownloadURL();
    //   // console.log("다운로드용 URL", downloadURL);
    //   if (downloadURL) {
    //     //FireStore DB에 저장할 video 데이터
    //     const video = {
    //       creatorUid: uid,
    //       email: email,
    //       title: title,
    //       description: description,
    //       genre: genre,
    //       cost: cost,
    //       createdAt: Date.now(),
    //       downloadURL: downloadURL,
    //     };
    //     // console.log("FireStore 저장 내역 ===> ", video);

    //     await dbService
    //       .collection(uid)
    //       .doc("video")
    //       .collection(uid)
    //       .doc(title)
    //       .set(video);
    //   }
    //   history.push("/individualwork");
    //   alert("업로드를 완료했습니다.");
    // } catch (error) {
    //   console.log(error);
    //   return alert("영상을 올리는데 실패했습니다. 나중에 시도해주세요.");
    // }
  };

  const onDrop = (files) => {
    const theFile = files[0];
    // console.log(theFile);

    if (theFile.size >= 200000000) {
      return alert("용량이 너무 크기 때문에 업로드가 불가합니다.");
    }

    if (theFile.type !== "video/mp4") {
      return alert("mp4 형식의 영상만 가능합니다.");
    }

    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      //동영상 미리보기 주소
      setPreview(finishedEvent.currentTarget.result);
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <Section>
      <Title>
        <h1> 작품 판매, 공유하기</h1>
      </Title>

      <form onSubmit={onSubmit}>
        {breakPoint ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
              {({ getRootProps, getInputProps }) => (
                <DropzoneBox {...getRootProps()}>
                  <input {...getInputProps()} />
                  <AddIcon style={{ fontSize: "3rem" }} />
                </DropzoneBox>
              )}
            </Dropzone>

            {preview && (
              <PreviewBox>
                <div>
                  <video src={preview} controls></video>
                </div>
                <p>영상 미리보기</p>
              </PreviewBox>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {preview ? (
              <></>
            ) : (
              <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
                {({ getRootProps, getInputProps }) => (
                  <DropzoneBox {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AddIcon style={{ fontSize: "3rem" }} />
                  </DropzoneBox>
                )}
              </Dropzone>
            )}

            {preview && (
              <PreviewBox>
                <div>
                  <video src={preview} controls></video>
                </div>
                <p>영상 미리보기</p>
              </PreviewBox>
            )}
          </div>
        )}

        <VideoDescription>
          <label>제목</label>
          <input onChange={handleChangeTitle} value={title} />

          <label>설명</label>
          <textarea onChange={handleChangeDecsription} value={description} />

          <div>
            <label>장르</label>
            <select onChange={handleChangeCategory}>
              {Catogory.map((item, index) => (
                <option key={index} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>

            <label>가격</label>
            <input
              placeholder="원 단위로 입력하세요."
              value={cost}
              onChange={handleChangeCost}
            />
          </div>

          <Button
            variant="contained"
            type="primary"
            size="large"
            onClick={onSubmit}
          >
            <span>공유하기</span>
          </Button>
        </VideoDescription>
      </form>
    </Section>
  );
};

export default VideoUploadPage;

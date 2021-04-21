import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
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
  position: relative;
  div {
    background: black;
    width: 300px;
    height: 240px;
  }
  video {
    width: 300px;
    height: 240px;
  }
  button {
    position: absolute;
    background: none;
    border: none;
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
  { label: "선택하세요." },
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

  //현재 로그인한 회원 식별 id
  const userId = useSelector((state) => state.auth.userId);

  const [dropFile, setDropFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [cost, setCost] = useState("");
  const [preview, setPreview] = useState("");

  const handleChangeTitle = (event) => {
    const { value } = event.currentTarget;
    if (value.length >= 50) return alert("최대 50자까지 작성가능 합니다.");
    setTitle(value);
  };

  const handleChangeDecsription = (event) => {
    const { value } = event.currentTarget;
    if (value.length >= 400) return alert("최대 400자까지 작성가능 합니다.");
    setDescription(value);
  };

  const handleChangeCategory = (event) => {
    const { value } = event.currentTarget;
    setGenre(value);
  };

  const handleChangeCost = (event) => {
    const { value } = event.currentTarget;
    //가격 숫자만 입력 가능
    setCost(Number(value.replace(/[^0-9]/g, "")));
  };

  //최종적으로 작성 정보, video file, thumbnail에 관한 정보를 하나의 document에 저장한다.
  const saveVideoData = (filePathAndName, fileDurationAndThumbnail) => {
    const data = {
      writer: userId,
      title,
      description,
      genre,
      cost,
      filePath: filePathAndName.filePath,
      duration: fileDurationAndThumbnail.fileDuration,
      thumbnail: fileDurationAndThumbnail.fileThumbnail,
    };
    console.log(data);
    //영상 관련 모든 데이터 저장
    axios.post("/api/video/uploadVideo", data).then((response) => {
      if (response.data.success) {
        alert("영상을 업로드하는데 성공했습니다.");
        history.push("/");
      } else {
        alert("영상을 업로드하는데 실패했습니다.(code:SVD)");
      }
    });
  };

  const saveThumbnail = (filePathAndName) => {
    //영상에대한 thumbnail과 파일 경로(filepath) 생성
    axios.post("/api/video/thumbnail", filePathAndName).then((response) => {
      if (response.data.success) {
        let fileDurationAndThumbnail = {
          fileDuration: response.data.fileDuration,
          fileThumbnail: response.data.thumbsFilePath,
        };
        console.log("thumbnails 생성 및 저장 성공");
        //최종적으로 video file 과 thumbnail에 대한 정보를 하나의 document에 저장
        saveVideoData(filePathAndName, fileDurationAndThumbnail);
      } else {
        alert("영상을 업로드하는데 실패했습니다.(code:ST)");
      }
    });
  };

  const saveVideoFile = () => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", dropFile);
    //동영상 파일을 저장
    axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response);
        let filePathAndName = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        console.log("영상 저장 완료");

        //영상에대한 thumbnail과 파일 경로(filepath) 생성
        saveThumbnail(filePathAndName);
      } else {
        alert("영상을 업로드하는데 실패했습니다.(code:SV)");
      }
    });
  };

  const onSubmit = (event) => {
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

    //영상 DB 저장(파일, 썸네일, 작성 내용)
    saveVideoFile();
  };

  const onDrop = (files) => {
    const theFile = files[0];
    setDropFile(theFile);
    // console.log(theFile);

    // 100mb 이상 업로드 불가
    if (theFile.size >= 100000000) {
      return alert("용량이 너무 크기 때문에 업로드가 불가합니다.");
    }

    if (theFile.type !== "video/mp4") {
      return alert("mp4 형식의 영상만 가능합니다.");
    }

    //영상 정보를 받아온다.
    const reader = new FileReader();
    reader.readAsDataURL(theFile);

    reader.onloadend = (finishedEvent) => {
      //동영상 미리보기 주소
      setPreview(finishedEvent.currentTarget.result);
    };
  };

  return (
    <Section>
      <Title>
        <h1> 작품 판매, 공유하기</h1>
      </Title>

      <form onSubmit={onSubmit}>
        {breakPoint ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Dropzone onDrop={onDrop} multiple={false}>
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
              <Dropzone onDrop={onDrop} multiple={false}>
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
          <input onChange={handleChangeTitle} value={title} maxLength={50} />

          <label>설명</label>
          <textarea
            onChange={handleChangeDecsription}
            value={description}
            maxLength={400}
          />

          <div>
            <label>장르</label>
            <select
              onChange={handleChangeCategory}
              defaultValue={"선택하세요."}
            >
              {Catogory.map((item, index) => (
                <option
                  key={index}
                  value={item.label}
                  disabled={index === 0 ? true : false}
                >
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

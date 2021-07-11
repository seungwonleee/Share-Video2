import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import DialogMessage from '../commons/DialogMessage';
import { dialogState } from '../../features/dialog/dialogSlice';
// Material UI Imports
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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
  { label: '선택하세요.' },
  { label: '코미디' },
  { label: '애니메이션' },
  { label: '액션' },
  { label: '음악' },
  { label: '동물' },
  { label: '스포츠' },
  { label: '멜로' },
  { label: 'SF' },
  { label: '가족' },
];

const VideoUploadPage = () => {
  const breakPoint = useMediaQuery({
    query: '(min-width:768px)',
  });
  let history = useHistory();
  const dispatch = useDispatch();

  //현재 로그인한 회원 식별 id
  const userId = useSelector((state) => state.auth.userId);
  const userNickname = useSelector((state) => state.auth.nickname);

  const [dropFile, setDropFile] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [cost, setCost] = useState('');
  const [preview, setPreview] = useState('');
  const [thumnail, setThumnail] = useState('');

  const fileInput = useRef();
  //20mb 이상인 경우 input value reset
  const resetInput = () => {
    fileInput.current.value = '';
  };

  const handleThumnail = (event) => {
    const imageFile = event.currentTarget.files[0];
    console.log(imageFile);
    if (imageFile.size >= 20 * 1024 * 1024) {
      //20mb 이상인 경우 input value reset
      resetInput();
      return alert('20mb 이상 업로드가 불가합니다.');
    }
    setThumnail(imageFile);
  };

  const handleChangeTitle = (event) => {
    const { value } = event.currentTarget;
    if (value.length >= 50) return alert('최대 50자까지 작성가능 합니다.');
    setTitle(value);
  };

  const handleChangeDecsription = (event) => {
    const { value } = event.currentTarget;
    if (value.length >= 400) return alert('최대 400자까지 작성가능 합니다.');
    setDescription(value);
  };

  const handleChangeCategory = (event) => {
    const { value } = event.currentTarget;
    setGenre(value);
  };

  const handleChangeCost = (event) => {
    const { value } = event.currentTarget;
    //가격 숫자만 입력 가능
    setCost(Number(value.replace(/[^0-9]/g, '')));
  };

  //db에 저장될 최종 정보
  const saveVideoData = (thumnailPath, videoFilePath, videoFileDuration) => {
    const data = {
      writer: userId,
      nickname: userNickname,
      title,
      description,
      genre,
      cost,
      filePath: videoFilePath,
      duration: videoFileDuration,
      thumbnail: thumnailPath,
    };

    //영상 관련 모든 데이터 저장
    axios
      .post('/api/video/saveVideoData', data)
      .then((response) => {
        //dialog 메시지 초기화, 제거
        dispatch(
          dialogState({
            dialogState: false,
            message: null,
          })
        );
        alert('영상을 업로드하는데 성공했습니다.');
        history.push('/');
      })
      .catch((error) => {
        alert(
          '영상을 업로드하는데 실패했습니다. 잠시 후 다시 시도해 주세요. (code: 3)'
        );
      });
  };

  // s3에 영상이 저장되면 thumbnail 저장 및 s3 파일 경로 생성
  const saveThumbnail = (videoData) => {
    let formData = new FormData();
    formData.append('file', thumnail);

    axios
      .post('/api/video/thumbnail', formData)
      .then((response) => {
        let thumnailPath = response.data.thumbnailPath;
        let videoFilePath = videoData.filePath;
        let videoFileDuration = videoData.fileDuration;
        //aws s3 thumnail 주소, video 주소, 영상 시간 정보
        saveVideoData(thumnailPath, videoFilePath, videoFileDuration);
      })
      .catch((error) => {
        alert(
          '영상을 업로드하는데 실패했습니다. 잠시 후 다시 시도해 주세요. (code: 2)'
        );
      });
  };

  //aws s3에 영상 파일 저장
  const saveVideoFile = () => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };

    formData.append('file', dropFile);
    //동영상 파일을 저장
    axios
      .post('/api/video/uploadfiles', formData, config)
      .then((response) => {
        let videoData = {
          filePath: response.data.filePath,
          fileDuration: response.data.fileDuration,
        };
        console.log('비디오 정보', videoData);

        //영상에대한 thumbnail과 파일 경로(filepath) 생성
        saveThumbnail(videoData);
      })
      .catch((error) => {
        alert(
          '영상을 업로드하는데 실패했습니다. 잠시 후 다시 시도해 주세요. (code: 1)'
        );
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      title === '' ||
      description === '' ||
      genre === '' ||
      cost === '' ||
      preview === '' ||
      thumnail === ''
    ) {
      return alert('모든 항목을 입력해주세요.');
    }

    //영상 DB 저장(파일, 썸네일, 작성 내용) uploadfiles => thumbnail => uploadVideo 순서
    saveVideoFile();
    // 업로드 되는 동안 dialog 메세지 출력
    dispatch(
      dialogState({
        dialogState: true,
        message: '영상 업로드 하고있습니다. 잠시만 기다려주세요.',
      })
    );
  };

  const onDrop = (files) => {
    const theFile = files[0];
    setDropFile(theFile);

    // 20mb 이상 업로드 불가
    if (theFile.size >= 20 * 1024 * 1024) {
      return alert('20mb 이상 업로드가 불가합니다.');
    }

    if (theFile.type !== 'video/mp4') {
      return alert('mp4 형식의 영상만 가능합니다.');
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={onDrop} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <DropzoneBox {...getRootProps()}>
                  <input {...getInputProps()} />
                  <AddIcon style={{ fontSize: '3rem' }} />
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
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {preview ? (
              <></>
            ) : (
              <Dropzone onDrop={onDrop} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <DropzoneBox {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AddIcon style={{ fontSize: '3rem' }} />
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
          <br />
          <label>설명</label>
          <textarea
            onChange={handleChangeDecsription}
            value={description}
            maxLength={400}
          />
          <br />
          <div>
            <label>장르</label>
            <select
              onChange={handleChangeCategory}
              defaultValue={'선택하세요.'}
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
            <br />
            <label>가격</label>
            <input
              placeholder="원 단위로 입력하세요."
              value={cost}
              onChange={handleChangeCost}
            />
          </div>
          <br />
          <input
            type="file"
            style={{ background: 'white', width: '50%', height: '100%' }}
            accept="image/png, image/jpeg"
            name="thumnail"
            onChange={handleThumnail}
            ref={fileInput}
          />
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
      <DialogMessage />
    </Section>
  );
};

export default VideoUploadPage;

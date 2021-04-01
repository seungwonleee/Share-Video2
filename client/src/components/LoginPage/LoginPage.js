import React, { useState } from "react";
import { authService, firebaseInstance } from "../../fire_module/fireMain";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled, { css } from "styled-components";
//Material UI 로그인 Form 관련 Imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//Font Awesome 관련 Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

// styled-components
const SocialLoginMixin = css`
  padding: 1rem;
  border: none;
  background: #f7f7f7;
  font-size: ${(props) => props.theme.fontSizes.base};
  &:hover {
    cursor: pointer;
  }
`;

const SocialLoginSection = styled.div`
  display: flex;
`;

const GoogleLoginSection = styled.button`
  ${SocialLoginMixin}
`;

const GithubLoginSection = styled.button`
  ${SocialLoginMixin}
`;

// Materaul UI 로그인 Form Design
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#A5292A",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "light-gray",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#A5292A",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#A5292A",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "gray",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black",
    },
    "& .MuiInputLabel-outlined": {
      color: "gray",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "gray",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "gray",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#A5292A",
    "&:hover": {
      background: "#822626",
    },
  },
  title: {
    fontSize: "3.4rem",
  },
  text: {
    fontSize: "1.6rem",
  },
  titleLink: {
    color: "black",
  },
}));

const LoginPage = () => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  //redux로 로그인 상태 체크
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // 로그인한 유저는 해당 페이지에 접근하지 못하도록 Redirect
  let history = useHistory();
  if (isLoggedIn) {
    history.push("/");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    switch (event.currentTarget.name) {
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };
  //로그인하기
  const handleLogin = async (event) => {
    event.preventDefault();

    await authService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // 로그인 성공
        if (user.operationType === "signIn") {
          alert("로그인 성공! 환영합니다.");
        }
        // 홈으로 이동
        history.push("/");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // firebase auth 오류 처리
        switch (errorCode) {
          case "auth/invalid-email":
            alert("유효하지 않은 이메일 입니다.");
            break;
          case "auth/user-disabled":
            alert("사용이 불가능한 계정 입니다.");
            break;
          case "auth/user-not-found":
            alert("없는 사용자 입니다.");
            break;
          case "auth/wrong-password":
            alert("비밀번호를 다시 확인해주세요.");
            break;
        }
      });
  };

  //Social 로그인 (Google, Github)
  const onSocialClick = async (event) => {
    const { name } = event.currentTarget;

    let provider;

    switch (name) {
      case "google":
        provider = new firebaseInstance.auth.GoogleAuthProvider();
        break;
      case "github":
        provider = new firebaseInstance.auth.GithubAuthProvider();
        break;
    }

    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Link to="/" className={classes.titleLink}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Share-Video
            </Typography>
          </Link>
          <Typography className={classes.text}>(로그인)</Typography>
          <form className={classes.form} onSubmit={handleLogin}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleInput}
              inputProps={{ className: classes.text }} // font size of input text
              InputLabelProps={{ className: classes.text }} // font size of input label
              className={classes.textField}
            />

            <TextField
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleInput}
              inputProps={{ className: classes.text }} // font size of input text
              InputLabelProps={{ className: classes.text }} // font size of input label
              className={classes.textField}
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="default"
                  style={{ transform: "scale(1.5)", paddingLeft: "1.5rem" }}
                />
              }
              label={<span style={{ fontSize: "1.4rem" }}>아이디 저장</span>}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <span className={classes.text}>로그인</span>
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link to="/findaccount" className={classes.text}>
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" className={classes.text}>
                회원가입
              </Link>
            </Grid>
          </Grid>
          <br />
          <h4 className={classes.text}>Social Login</h4>
          <SocialLoginSection>
            <GoogleLoginSection name="google" onClick={onSocialClick}>
              <FontAwesomeIcon icon={faGoogle} size="2x" />
            </GoogleLoginSection>
            <GithubLoginSection name="github" onClick={onSocialClick}>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </GithubLoginSection>
          </SocialLoginSection>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { authService } from "../../fire_module/fireMain";
import { Link } from "react-router-dom";
//Material UI 로그인 Form 관련 Imports
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Materaul UI 회원가입 Form Design
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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
}));

const FindAccountPage = () => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleInput = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleFindAccount = async (event) => {
    event.preventDefault();

    await authService
      .sendPasswordResetEmail(email)
      .then(function () {
        // Password reset email sent.
        alert("해당 이메일로 비밀번호 관련 이메일을 보냈습니다.");
      })
      .catch(function (error) {
        // Error occurred. Inspect error.code.
        // 에러 코드에 따라 처리 필요
        // 만약 에러코드 find2 와 함께 문의가 오면, 문제가 되는 해당 이메일의 도메인 주소를 확인하고 firebase 콘솔로가서 Authentication 메뉴 ==> Sign-in-method 탭 ==> 아래에 승인된 도메인 추가하기
        // console.log(error);
        // console.log(error.code);
        switch (error.code) {
          case "auth/user-not-found":
            alert("가입된 계정이 아니거나 삭제되었을 수 있습니다.");
            break;
          case "auth/unauthorized-continue-uri":
            alert(
              "에러 코드와 함께 관리자에게 문의가 필요합니다. 에러코드: find2"
            );
            break;
          case "auth/invalid-continue-uri":
            alert(
              "에러 코드와 함께 관리자에게 문의가 필요합니다. 에러코드: find3"
            );
            break;
          case "auth/missing-ios-bundle-id":
            alert(
              "에러 코드와 함께 관리자에게 문의가 필요합니다. 에러코드: find4"
            );
            break;
          case "auth/missing-continue-uri":
            alert(
              "에러 코드와 함께 관리자에게 문의가 필요합니다. 에러코드: find5"
            );
            break;
          case "auth/missing-android-pkg-name":
            alert(
              "에러 코드와 함께 관리자에게 문의가 필요합니다. 에러코드: find6"
            );
            break;
          case "auth/invalid-email":
            alert("잘못된 형식의 이메일 주소입니다.");
            break;
          default:
            break;
        }
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.title}>
          Share-Video
        </Typography>
        <br />
        <Typography className={classes.text}>(계정 찾기)</Typography>
        <br />
        <Typography className={classes.text}>
          작성하신 이메일로 로그인 가능한 링크를 보내드립니다.
        </Typography>
        <form className={classes.form} onSubmit={handleFindAccount}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleInput}
                inputProps={{ className: classes.text }} // font size of input text
                InputLabelProps={{ className: classes.text }} // font size of input label
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <span className={classes.text}>계정 찾기</span>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2" className={classes.text}>
                이미 계정이 있으신가요? 로그인 하기
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default FindAccountPage;

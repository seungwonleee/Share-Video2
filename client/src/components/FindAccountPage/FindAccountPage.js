import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//Material UI 로그인 Form 관련 Imports
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
    backgroundColor: "#A5292A",
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

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [resetPasswordState, setResetPasswordState] = useState(false);
  const [responseUserData, setResponseUserData] = useState(null);
  const [resetPassword, setResetPassword] = useState("");

  const handleInput = (event) => {
    const { name, value } = event.currentTarget;
    // setEmail(event.currentTarget.value);
    console.log(name);
    console.log(value);
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "name":
        setName(value);
        break;
      case "resetPassword":
        setResetPassword(value);
        break;
      default:
        break;
    }
  };

  //비밀번호 찾기(변경)
  const handleFindAccount = async (event) => {
    event.preventDefault();

    let body = {
      email,
      name,
    };

    await axios.post("/api/users/findaccount", body).then((response) => {
      const userInfo = response.data.user;
      console.log(userInfo);
      if (response.data.findAccount) {
        setResetPasswordState(true);
        setResponseUserData(userInfo);
      } else {
        alert(response.data.message);
      }
    });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (resetPassword.length < 6) {
      return alert("비밀번호는 6자리 이상이어야 합니다.");
    }

    let body = {
      ...responseUserData,
      password: resetPassword,
    };
    //
    await axios.post("/api/users/resetpassword", body).then((response) => {
      if (response.data.resetPassword) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        history.push("/login");
      } else {
        alert("비밀번호를 변경하는데 실패했습니다. 나중에 시도해 주세요.");
      }
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.title}>
          Share-Video
        </Typography>
        <br />
        <Typography className={classes.text}>(계정 찾기)</Typography>
        <br />
        {resetPasswordState ? (
          <>
            <Typography className={classes.text}>
              새롭게 설정하실 비밀번호를 입력해주세요.
            </Typography>
            <form className={classes.form} onSubmit={handleResetPassword}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    id="resetPassword"
                    label="Password"
                    name="resetPassword"
                    autoFocus
                    value={resetPassword}
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
                <span className={classes.text}>비밀번호 변경</span>
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" className={classes.text}>
                    비밀번호가 기억나셨나요? 로그인 하기
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <>
            <Typography className={classes.text}>
              가입 시 이메일 주소와 이름을 작성해 주세요.
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
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    value={name}
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
                    비밀번호가 기억나셨나요? 로그인 하기
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </div>
    </Container>
  );
};

export default FindAccountPage;

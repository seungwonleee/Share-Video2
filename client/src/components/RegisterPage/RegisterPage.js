import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
//회원가입 Form Material UI Imports
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

// Materaul UI 회원가입 Form Design
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
  titleLink: {
    color: "black",
  },
}));

const RegisterPage = () => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [eventAgreement, setEventAgreement] = useState(true);

  const handleInput = (event) => {
    switch (event.currentTarget.name) {
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      case "name":
        setName(event.currentTarget.value);
        break;
      case "nickname":
        setNickname(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  //아이디 저장(기억하기)
  const handleEventAgreement = (event) => {
    const { checked } = event.target;
    setEventAgreement(checked);
  };

  //회원가입
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      return alert("비밀번호를 6자리 이상 입력해주세요.");
    }

    let body = {
      email,
      password,
      name,
      nickname,
      eventAgreement,
      createdAt: Date.now(),
      profile: null,
    };

    //DB에 저장
    axios
      .post("/api/users/register", body)
      .then((response) => {
        if (response.data.success) {
          alert("회원가입에 성공했습니다.");
          // LandingPage로 이동
          history.push("/login");
        } else {
          if (response.data.error.keyPattern.email === 1) {
            alert("이미 회원가입 되어있는 계정입니다.");
          }
          if (response.data.error.keyPattern.nickname === 1) {
            alert("이미 사용중인 nickname 입니다.");
          }
        }
      })
      .catch((error) => console.log(error));
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
          <Typography className={classes.text}>(회원가입)</Typography>
          <form className={classes.form} onSubmit={handleCreateAccount}>
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
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  value={password}
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
                  name="name"
                  label="Name"
                  id="name"
                  value={name}
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
                  name="nickname"
                  label="Nickname"
                  id="nickname"
                  value={nickname}
                  onChange={handleInput}
                  inputProps={{ className: classes.text }} // font size of input text
                  InputLabelProps={{ className: classes.text }} // font size of input label
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="default"
                      defaultChecked={true}
                      onChange={handleEventAgreement}
                      style={{ transform: "scale(1.5)", paddingLeft: "1.5rem" }}
                    />
                  }
                  label={
                    <span style={{ fontSize: "1.4rem" }}>
                      이메일로 이벤트 관련 소식을 받고 싶습니다.
                    </span>
                  }
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
              <span className={classes.text}>회원가입</span>
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
    </>
  );
};

export default RegisterPage;

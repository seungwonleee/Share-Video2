import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
//Material UI 로그인 Form 관련 Imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// Materaul UI 로그인 Form Design
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#A5292A',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'light-gray',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A5292A',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#A5292A',
    },
    '& .MuiOutlinedInput-input': {
      color: 'black',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'gray',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'black',
    },
    '& .MuiInputLabel-outlined': {
      color: 'gray',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'gray',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'gray',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#A5292A',
    '&:hover': {
      background: '#822626',
    },
  },
  title: {
    fontSize: '3.4rem',
  },
  text: {
    fontSize: '1.6rem',
  },
  titleLink: {
    color: 'black',
  },
}));

const LoginPage = () => {
  // Materail Ui 디자인에 사용
  const classes = useStyles();

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberId, setRememberId] = useState(true);

  useEffect(() => {
    //이전에 로그인시 checkbox 아이디 저장을 눌럿으면 해당 계정 정보를 가져온다.
    const emailId = localStorage.getItem('remember_id');
    if (emailId) {
      setEmail(emailId);
    }
  }, []);

  const handleInput = (event) => {
    switch (event.currentTarget.name) {
      case 'email':
        setEmail(event.currentTarget.value);
        break;
      case 'password':
        setPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  };
  //이메일 주소 로그인
  const handleLogin = (event) => {
    event.preventDefault();
    if (password.length < 6) {
      return alert('비밀번호를 6자리 이상 입력해주세요.');
    }

    let body = {
      email,
      password,
    };
    //로그인 user token 생성 및 cookie에 저장
    axios
      .post('/api/users/login', body)
      .then((response) => {
        if (response.data.loginSuccess) {
          alert(`${response.data.userNickname}님 환영합니다.`);
          // 홈으로 이동
          history.push('/');
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => console.log(error));

    //아이디 저장 체크박스에 체크하고 로그인에 성공하면 아이디 저장(기억하기)
    if (rememberId) {
      localStorage.setItem('remember_id', email);
    } else {
      localStorage.removeItem('remember_id');
    }
  };

  //아이디 저장(기억하기);
  const handleRememberId = (event) => {
    const { checked } = event.target;
    setRememberId(checked);
  };

  return (
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
                defaultChecked={true}
                onChange={handleRememberId}
                style={{ transform: 'scale(1.5)', paddingLeft: '1.5rem' }}
              />
            }
            label={<span style={{ fontSize: '1.4rem' }}>아이디 저장</span>}
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
      </div>
    </Container>
  );
};

export default LoginPage;

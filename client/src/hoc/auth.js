import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setLoginState,
  setId,
  setEmail,
  setNickname,
} from '../features/auth/authSlice';

const auth = (SpecificComponent, option) => {
  //option 미입력    =>  아무나 출입이 가능한 페이지
  //true    =>  로그인한 유저만 출입이 가능한 페이지
  //false   =>  로그인한 유저는 출입 불가능한 페이지

  const AuthenticationCheck = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
      axios
        .get('/api/users/auth')
        .then((res) => {
          console.log('auth ===> ', res.data);

          //로그인 하지 않은 상태
          if (!res.data.isAuth) {
            if (option) {
              alert('로그인 후 사용 가능합니다.');
              return history.push('/login');
            }
          } else {
            //로그인 한 상태
            if (option === false) {
              history.push('/');
            }
            dispatch(setLoginState(res.data.isAuth));
            dispatch(setId(res.data._id));
            dispatch(setEmail(res.data.email));
            dispatch(setNickname(res.data.nickname));
          }
        })
        .catch((error) => {
          console.error(error);
          alert('사용자 인증에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        });
    }, []);

    return <SpecificComponent />;
  };
  return AuthenticationCheck;
};

export default auth;

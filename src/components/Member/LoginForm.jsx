import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setTokens } from '../../persist-store'; // store에서 액션 생성자 import
import { Button, TextField } from '@mui/material';
import './LoginForm.css';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // 페이지 로드 시 저장된 access 토큰이 있는지 확인하고 있다면 인증 상태로 설정
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(setTokens({ accessToken }));
    }
  }, [dispatch]);

  const login = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8090/auth/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;

        // localStorage에 access 토큰 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        dispatch(setTokens({ accessToken })); // 액션 생성자를 사용하여 액션을 디스패치합니다.
        dispatch({ type: 'USERID', payload: res.data.userid });

        // 로그인 성공 후 Main 컴포넌트로 이동
        document.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        alert('로그인에 실패하였습니다.');
      });
  };

  return (
    <div className="LoginForm">
      <div className='login-background'>
        <h2>로그인</h2>
        <form className='login-form' onSubmit={login}>
          <TextField
            className='login-email'
            type="text"
            label="Email"
            name="email"
            value={email}
            color='success'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          &nbsp;&nbsp;
          <TextField
            className='login-passwd'
            type="password"
            label="Password"
            name="password"
            color='success'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          &nbsp;&nbsp;
          <Button type="submit" variant="contained" fullWidth style={{ backgroundColor:'rgba(29, 192, 120, 1)'}}>
          로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

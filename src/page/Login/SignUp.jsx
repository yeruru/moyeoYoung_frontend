import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    profileContent: '',
    provider: 'Moyoung', // 기본값은 Moyoung로 설정
  });

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailCheck = () => {
    // 이메일 중복 확인 로직을 추가합니다.
    // 예를 들어, 서버 API를 호출하여 이메일 중복 여부를 확인할 수 있습니다.
    // 이 함수에서는 API를 호출하고, 중복된 경우 isEmailDuplicated를 true로 설정하면 됩니다.
    // 이 예제에서는 임의로 true를 설정합니다.
    setIsEmailDuplicated(true);
  };

  const handleNicknameCheck = () => {
    // 닉네임 중복 확인 로직을 추가합니다.
    // 예를 들어, 서버 API를 호출하여 닉네임 중복 여부를 확인할 수 있습니다.
    // 이 함수에서는 API를 호출하고, 중복된 경우 isNicknameDuplicated를 true로 설정하면 됩니다.
    // 이 예제에서는 임의로 true를 설정합니다.
    setIsNicknameDuplicated(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // 여기서 이메일, 닉네임, 비밀번호의 글자 수 제한을 체크합니다.
    if (formData.email.length < 5 || formData.email.length > 30) {
      // 이메일의 글자 수가 5자 미만 또는 30자 초과일 때 처리
      alert('이메일은 5자 이상 30자 이하로 입력해주세요.');
      return;
    }

    if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      // 닉네임의 글자 수가 2자 미만 또는 20자 초과일 때 처리
      alert('닉네임은 2자 이상 20자 이하로 입력해주세요.');
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      // 비밀번호의 글자 수가 8자 미만 또는 20자 초과일 때 처리
      alert('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
      return;
    }


    // 회원가입 API를 호출합니다.
    axios.post('http://localhost:8090/auth/signup', {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      profileContent: formData.profileContent,
      provider: formData.provider,
    })
    .then((response) => {
      // 회원가입 성공 시 처리할 로직을 작성합니다.
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      document.location.href = '/login';
    })
    .catch((error) => {
      // 회원가입 실패 시 처리할 로직을 작성합니다.
      console.error('회원가입 실패:', error.response.data);
      alert('회원가입에 실패하였습니다.');
    });
  };

  return (
    <div className='wrap'>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          color='success'
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText={isEmailDuplicated ? '중복된 이메일입니다.' : ''}
          error={isEmailDuplicated}
        />
        <Button variant="outlined" onClick={handleEmailCheck} >이메일 중복 확인</Button>
        <TextField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          color='success'
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="nickname"
          label="Nickname"
          value={formData.nickname}
          color='success'
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText={isNicknameDuplicated ? '중복된 닉네임입니다.' : ''}
          error={isNicknameDuplicated}
        />
        <Button variant="outlined" onClick={handleNicknameCheck}>닉네임 중복 확인</Button>
        <TextField
          name="profileContent"
          label="Profile Content"
          multiline
          rows={4}
          value={formData.profileContent}
          color='success'
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Social Type</FormLabel>
          <RadioGroup
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            style={{ flexDirection: 'row' }}
          >
            <FormControlLabel value="moyoung" control={<Radio />} label="Moyoung" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor:'rgba(29, 192, 120, 1)'}}>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignUp;

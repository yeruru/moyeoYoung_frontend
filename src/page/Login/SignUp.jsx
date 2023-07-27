import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    fileName: 'normal.png',
    profileContent: '',
    provider: 'Moyoung',
    verificationCode: '',
    generatedCode: '',
  });

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailCheck = () => {
    axios
      .get(`${process.env.REACT_APP_BURL}/auth/checkedemail?email=${formData.email}`)
      .then((response) => {
        setIsEmailDuplicated(response.data);
      })
      .catch((error) => {
        console.error('이메일 중복 확인 에러:', error);
        setIsEmailDuplicated(true);
      });
  };

  const handleEmailSend = () => {
    axios
      .post(`${process.env.REACT_APP_BURL}/auth/mailConfirm?email=${formData.email}`)
      .then((response) => {
        setFormData({ ...formData, generatedCode: response.data, verificationCode: '' });
        console.log(response.data);
        setIsEmailSent(true);
      })
      .catch((error) => {
        console.error('이메일 전송 실패:', error);
        alert('이메일 전송에 실패하였습니다.');
      });
  };

  const handleVerificationCodeChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, verificationCode: value });
  };

  const handleNicknameCheck = () => {
    axios
      .get(`${process.env.REACT_APP_BURL}/auth/checkednick?nickname=${formData.nickname}`)
      .then((response) => {
        setIsNicknameDuplicated(response.data);
      })
      .catch((error) => {
        console.error('닉네임 중복 확인 에러:', error);
        setIsNicknameDuplicated(true);
      });
  };

  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const isPasswordValid = () => {
    return formData.password === passwordConfirmation;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isEmailSent) {
      alert('이메일 인증 번호를 발송해주세요.');
      return;
    }
  
    if (formData.verificationCode !== formData.generatedCode) {
      alert('인증 번호가 일치하지 않습니다.');
      return;
    }

    if (formData.email.length < 5 || formData.email.length > 30) {
      alert('이메일은 5자 이상 30자 이하로 입력해주세요.');
      return;
    }

    if (formData.nickname.length < 2 || formData.nickname.length > 20) {
      alert('닉네임은 2자 이상 20자 이하로 입력해주세요.');
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 20) {
      alert('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
      return;
    }

    if (!isPasswordValid()) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BURL}/auth/signup`, {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        fileName: formData.fileName, // fileName 추가
        profileContent: formData.profileContent,
        provider: formData.provider,
      })
      .then((response) => {
        alert('회원가입이 완료되었습니다.');
        document.location.href = '/login';
      })
      .catch((error) => {
        alert('회원가입에 실패하였습니다.');
      });
  };

  

  return (
    <div className='wrap'>
      <h2 className='singup-title'>회원가입</h2>
      <div className='signup-main'>
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <TextField
          name="email"
          label="이메일"
          value={formData.email}
          color="success"
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText={
            formData.email !== '' ? (isEmailDuplicated ? '중복된 이메일입니다.' : '사용 가능한 이메일입니다.') : ''
          }
          error={isEmailDuplicated}
        />
          <Button variant="outlined" color='success' onClick={handleEmailCheck}>이메일 중복 확인</Button>
          {!isEmailSent ? (
            <>
              <Button variant="outlined"  color='primary'  style={{ marginLeft: 10}}onClick={handleEmailSend}>이메일 인증번호 발송</Button>
              <br />
            </>
          ) : (
            <>
              <TextField
                name="verificationCode"
                type="text"
                label="인증 코드"
                value={formData.verificationCode}
                onChange={handleVerificationCodeChange}
                fullWidth
                margin="normal"
                helperText={formData.verificationCode === formData.generatedCode ? '인증 번호가 일치합니다.' : '인증 번호가 일치하지 않습니다.'}
                error={formData.verificationCode !== formData.generatedCode && formData.verificationCode !== ''}
              />
              <br />
            </>
          )}
          <TextField
            name="password"
            label="비밀번호"
            type="password"
            value={formData.password}
            color='success'
            placeholder='비밀번호는 8자 이상 20자 이하로 입력해주세요.'
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="passwordConfirmation"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirmation}
            color="success"
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            fullWidth
            margin="normal"
            helperText={
              formData.password !== '' && passwordConfirmation !== ''
                ? formData.password === passwordConfirmation
                  ? '비밀번호가 일치합니다.'
                  : '비밀번호가 일치하지 않습니다.'
                : ''
            }
            error={formData.password !== passwordConfirmation && passwordConfirmation !== ''}
          />
          <TextField
            name="nickname"
            label="닉네임"
            placeholder='닉네임은 2자 이상 20자 이하로 입력해주세요.'
            value={formData.nickname}
            color='success'
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText={
              formData.nickname !== ''
                ? isNicknameDuplicated
                  ? '중복된 닉네임입니다.'
                  : '사용 가능한 닉네임입니다.'
                : ''
            }
            error={isNicknameDuplicated}
          />
          <Button variant="outlined" color='success' onClick={handleNicknameCheck}>닉네임 중복 확인</Button>
          <TextField
            style={{fontFamily:'inherit'}}
            name="profileContent"
            label="자기소개"
            placeholder='자기소개는 100자 미만으로 작성해주세요.'
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
          <Button type="submit" variant="contained" color="primary"fullWidth style={{ backgroundColor: 'rgba(29, 192, 120, 1)' }}>
            회원가입
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

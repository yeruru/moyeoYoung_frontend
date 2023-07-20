import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setTokens } from "../../persist-store"; // store에서 액션 생성자 import
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import "./LoginForm.css";
// import { useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [verificationCode, setVerificationCode] = useState(""); //인증번호
  const [isCodeVerified, setIsCodeVerified] = useState(false); //인증번호 확인

  const [formData, setFormData] = useState({ 
    email: "",
    generatedCode: "", 
    newPassword: "" , 
    confirmedPassword:''
  });

  // const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드 시 저장된 access 토큰이 있는지 확인하고 있다면 인증 상태로 설정
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(setTokens({ accessToken }));
      document.location.href = "/";
    }
  }, [dispatch]);

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        console.log(accessToken);
        console.log(refreshToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setAccessToken(accessToken);
        dispatch(setTokens({ accessToken }));
        dispatch({ type: "USERID", payload: res.data.memberId });
        console.log("로그인 성공");
        console.log(res.data.email);
        console.log(accessToken);
        // 로그인 성공 후 Main 컴포넌트로 이동
        document.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패하였습니다.");
      });
  };

  //비밀번호찾기
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEmailSend = (event) => {
    setEmail(event.target.value);
  };
  //이메일 체크
  const handleEmailExistenceCheck = () => {
    axios
      .get(`http://localhost:8090/auth/checkedemail?email=${formData.email}`)
      .then((response) => {
        const isEmailExist = response.data;
        console.log(formData.email);
        if (isEmailExist) {
          handleSendVerificationCode();
        } else {
          alert("존재하지 않는 이메일입니다.");
        }
      })
      .catch((error) => {
        console.error("이메일 존재 여부 확인 에러:", error);
        alert("존재하지 않는 이메일입니다.");
      });
  };

  //이메일로 인증코드전송
  const handleSendVerificationCode = () => {
    axios
      .post(`http://localhost:8090/auth/mailConfirm?email=${formData.email}`)
      .then((response) => {
        const verificationCode = response.data;
        setFormData({
          ...formData,
          generatedCode: response.data,
          verificationCode: "",
        });
        console.log("인증코드: ", verificationCode);
        alert("인증번호를 이메일로 발송했습니다.");
        setVerificationCode(verificationCode);
      })
      .catch((error) => {
        console.error("이메일 발송 요청 에러:", error);
      });
  };
  //인증코드 확인s

  const handleVerificationCodeChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, verificationCode: value });
  };

  const handleVerifyCode = () => {
    if (verificationCode !== formData.generatedCode) {
      alert("인증 번호가 일치하지 않습니다.");
      return;
    }
    setIsCodeVerified(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePasswordReset = () => {
    if (formData.newPassword !== formData.confirmedPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }


    axios
      .post("http://localhost:8090/member/passwdUpdate", formData, {
        params: {
          email: formData.email,
        },
      })
      .then((response) => {
        alert("비밀번호가 성공적으로 재설정되었습니다.");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(formData.email);
        console.log(formData.newPassword);
        console.log(err);
        alert("비밀번호 재설정에 실패하였습니다.");
      });
  };



  return (
    <div className="LoginForm">
      <div className="login-background">
        <h2>로그인</h2>
        <form className="login-form" onSubmit={login}>
          <TextField
            className="login-email"
            type="text"
            label="Email"
            name="email"
            value={email}
            color="success"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          &nbsp;&nbsp;
          <TextField
            className="login-passwd"
            type="password"
            label="Password"
            name="password"
            color="success"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          &nbsp;&nbsp;
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: "rgba(29, 192, 120, 1)" }}
          >
            로그인
          </Button>
        </form>
        <Button
          className="find-loginBtn"
          onClick={handleModalOpen}
          variant="outlined"
          fullWidth
          style={{ margin: 20 }}
        >
          비밀번호 찾기
        </Button>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>비밀번호 찾기</DialogTitle>
          <DialogContent>
            {!isCodeVerified ? (
              <>
                <TextField
                  style={{ width: "300px" }}
                  type="email"
                  label="이메일"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleEmailExistenceCheck}
                >
                  인증번호 발송
                </Button>
                <TextField
                  type="text"
                  label="인증번호"
                  value={formData.verificationCode}
                  onChange={handleVerificationCodeChange}
                  helperText={formData.verificationCode === formData.generatedCode ? '인증 번호가 일치합니다.' : '인증 번호가 일치하지 않습니다.'}
                  required
                />
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleVerifyCode}
                  disabled={formData.verificationCode !== formData.generatedCode}
                >
                  인증번호 확인
                </Button>
              </>
            ) : (
              <>
                <TextField
                  type="password"
                  label="새로운 비밀번호"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      newPassword: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
                <TextField
                  type="password"
                  label="비밀번호 확인"
                  value={formData.confirmedPassword}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      confirmedPassword: e.target.value,
                    }))
                  }
                  required
                  fullWidth
                />
                <Button type="button" variant="contained" onClick={handlePasswordReset}>
                  비밀번호 재설정
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginForm;

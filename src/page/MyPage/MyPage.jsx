import React, { useState, useEffect } from "react";
import "../../images/member/normal.png"
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import "./MyPage.css";
// TODO: 비밀번호 재설정시 유효성로직을 추가 ,  기본이미지 설정 로직 변경
const MyPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    fileName: "normal.png",
    nickname: "",
    profileContent: "",
    regdate: "",
  });
  const [memberId, setMemberId] = useState(0);
  
  useEffect(() => {
    // 유저 정보 가져오기
    axios
      .get("http://localhost:8090/member/mypage", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((res) => {
        console.log(res.data.memberId);
        setMemberId(res.data.memberId);
        console.log(res.data.email);
        setFormData({
          fileName: res.data.fileName,
          nickname: res.data.nickname,
          profileContent: res.data.profileContent,
          regdate: res.data.regdate,
        });
        setPreviewImage(`http://localhost:8090/room/view/${res.data.fileName}`);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(accessToken);
  }, [accessToken]);

  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    // 프로필 사진 미리보기 처리
    const file = event.target.files[0];
    setFormData((prevformData) => {
      return {
      ...prevformData,
      fileName: file.name,
      file: file,
      };
    });
    console.log(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  console.log(formData);


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleProfileUpdate = () => {
    const form = new FormData();
    form.append("nickname", formData.nickname);
    form.append("profileContent", formData.profileContent);
    form.append("fileName", formData.fileName);
    form.append("file", formData.file); // 파일 데이터 추가
    console.log(formData.fileName);
    console.log(formData.file);
    axios
    .post(`http://localhost:8090/member/update/${memberId}`, form,{
      headers: {
        "Content-Type" : "multipart/form-data; charset= UTF-8",
      },
    })
      .then((response) => {
        console.log("프로필 업데이트 성공:", response.data);
        handleModalClose();
      })
      .catch((error) => {
        console.log(formData.file);
        console.error("프로필 업데이트 실패:", error);
        // 업데이트 실패에 대한 처리를 진행합니다.
      });

      
  };

  // 닉네임 중복 체크
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const handleNicknameCheck = () => {
    axios
      .get(`http://localhost:8090/auth/checkednick?nickname=${formData.nickname}`)
      .then((response) => {
        setIsNicknameDuplicated(response.data);
      })
      .catch((error) => {
        console.error('닉네임 중복 확인 에러:', error);
        setIsNicknameDuplicated(true);
      });
  };

  return (
    <div className="MyPage wrap">
      <div className="mypage-header">
        {/* <a href="#">마이페이지</a>
        <a href="#">내모임방</a> */}
      </div>
      <div className="mypage-contnent">

        <div className="mypage-box">
          {/* 프로필 데이터 */}
          <div className="mypage-data">
            <p>이미지</p>
            <div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="프로필 사진"
                />
              )}
            </div>
            <h2>{formData.nickname}</h2>
            <p>{formData.profileContent}</p>
            <p>가입일: {formData.regdate}</p>
          </div>
          <div className="mypage-box">
            <Button type="button" variant="outlined" fullWidth onClick={handleModalOpen}>
              프로필 수정
            </Button>
          </div>
        </div>

        {/* 관심목록 */}
        <div className="mypage-favorite">
            <div>
                <h4>모임관심목록</h4>
            </div>
        </div>        
      </div>
        {/* 프로필 수정 모달 */}
      <div>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogContent>
            {/* <form onSubmit={handleProfileUpdate} method="get"> */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {previewImage && (
                <div className="mypage-img-box">
                  <img
                    src={previewImage}
                    alt="프로필 사진 미리보기"
                    style={{ width: "200px" }}
                  />
                </div>
              )}
              <TextField
                name="nickname"
                label="Nickname"
                placeholder='닉네임은 2자 이상 20자 이하로 입력해주세요.'
                value={formData.nickname}
                color='success'
                onChange={handleChange}
                fullWidth
                margin="normal"
                helperText={isNicknameDuplicated ? '중복된 닉네임입니다.' : '사용 가능한 닉네임입니다.'}
                error={isNicknameDuplicated}
              />
              <Button variant="outlined" color='success' onClick={handleNicknameCheck}>닉네임 중복 확인</Button>
              <TextField
                name="profileContent"
                label="자기 소개"
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <DialogActions>
                <Button onClick={handleModalClose} color="secondary">
                  취소
                </Button>
                <Button onClick={handleProfileUpdate} color="primary">
                  저장
                </Button>
              </DialogActions>
            {/* </form> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
    
  );
};

export default MyPage;

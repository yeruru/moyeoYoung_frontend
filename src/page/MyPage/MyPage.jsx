import React, { useState, useEffect, useRef } from "react";
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
import styled from 'styled-components';
import imge from '../../images/photo/profile.svg';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Profile from '../../components/Profile/Profile';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

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
  const [profileModal,setProfileModal] = useState(false);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
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
  const fileInputRef = useRef(null);

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
    if (isNicknameDuplicated) {
      alert('닉네임이 중복되었습니다');
      return;
    }

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
        window.location.reload(); 
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

  // 프로필 변경하기
  const handleSelectImage = () => {
    // input 파일 선택 창 열기
    fileInputRef.current?.click();
  };


  // 회원탈퇴 모달창
  const [isBoxShown, setIsBoxShown] = useState(false);

  const handleMoreVertIconClick = () => {
    setIsBoxShown(!isBoxShown);
  };

  const handleWithdrawClick = () => {
  const isConfirmed = window.confirm('탈퇴시 본인이 작성한 게시물 및 정보 등이 삭제 됩니다. \n정말 탈퇴하시겠습니까?');
  if (isConfirmed) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };

    axios.delete(`http://localhost:8090/member/delete/${memberId}`, config)
      .then((response) => {
        alert('회원 탈퇴가 완료되었습니다.');
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        
      })
      .catch((error) => {
        alert('회원 탈퇴에 실패하였습니다. 다시 시도해주세요.');
      });
  }
};
  
// 내 프로필 모달
  const openProfile = (feednickname) => {
    setNickname(feednickname);
    setProfileModal(!profileModal);
  }

  const ProfileCloseModal = () => {
    setProfileModal(!profileModal);
  }




  return (
    <div className="MyPage">
      <div className="mypage-contnent" style={{height:'100%'}}>
        <div className="mypage-icon-nav-box" style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
          <MoreVertIcon onClick={handleMoreVertIconClick}/>
          <div className={`maypage-icon-nav-box-mo ${isBoxShown ? 'show' : ''}`}>
            <ul>
              <li><button onClick={()=>openProfile(formData.nickname)}>내 프로필</button></li>
              <li><button onClick={handleWithdrawClick}>회원 탈퇴</button></li>
            </ul>
          </div>
        </div>
        <div className="mypage-box" style={{height:'100%'}}>
          {/* 프로필 데이터 */}
          <div className="mypage-data" style={{height:'86%'}}>
            <div>
                <img
                  src={previewImage}
                  alt="프로필 사진"
                />
            </div>
            <h2>{formData.nickname}</h2>
            <p>{formData.profileContent}</p>
            <Button type="button" variant="outlined" fullWidth onClick={handleModalOpen} style={{fontFamily:'inherit', border:'0', fontSize:'20px', color:'#666666'}}>프로필 정보 변경<KeyboardArrowRightIcon/></Button>
          </div>
        </div>
      </div>
        {/* 프로필 수정 모달 */}
      <div>
        <Dialog open={isModalOpen} onClose={handleModalClose} style={{zIndex: '999999'}}>
          <DialogTitle className="dialogtitle-mo" style={{fontFamily:'inherit'}}>프로필 정보 변경</DialogTitle>
          <DialogContent style={{width:'540px'}}>
            <div className="pro-modify-box">
              <span onClick={handleSelectImage} ><CameraEnhanceIcon/></span>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
                {previewImage && (
                  <div className="mypage-img-box">
                      <img
                        src={previewImage}
                        alt="프로필 사진"
                      />
                  </div>
                )}
              </div>
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
              <p style={{fontSize:'14px'}}>가입일: {formData.regdate}</p>
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

        <Profile
          isOpen={profileModal}
          content={nickname}
          isClose={ProfileCloseModal}
        />
        
      </div>
    </div>
    
  );
};

export default MyPage;



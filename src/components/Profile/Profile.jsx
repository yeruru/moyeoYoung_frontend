import React, { useState, useEffect } from "react";
import { Dialog, DialogContent} from "@mui/material";
import { Link} from 'react-router-dom';
import pro from '../../images/music/music-3.jpg'
import styled from 'styled-components';
import axios from 'axios';



const Profile = ({ nickname }) => {
  const [profileData, setProfileData] = useState('');

   // 모달
   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleModalOpen = () => {
     setIsModalOpen(true);
   };
   const handleModalClose = () => {
     setIsModalOpen(false);
   };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // JWT 토큰을 로컬 스토리지에서 가져오기
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        // 프로필 조회 API 호출
        const response = await axios.get(`http://localhost:8090/member/profile/${nickname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileData(response.data);
      } catch (error) {
        console.error(error.message);
        // 에러 처리 로직 추가
      }
    };

    fetchProfileData();
  }, [nickname]);

 


  return (
    <>
      {/* 프로필 사진 */}
      <span onClick={handleModalOpen}>프로필</span>

      {/* 모달 */}
      <Dialog open={isModalOpen} onClose={handleModalClose} style={{zIndex: '999999'}}>
        <DialogContent style={{width:'320px', height:'400px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <ProBox>
            <img src={pro} alt="" style={{objectFit:'cover', width:'100%', height:'100%'}}/>
          </ProBox>
          <h4 style={{fontSize:'30px', display:'block', marginBottom:'25px'}}>닉네임</h4>
          <ProTextBox>
            <p>ddddddddddddddddddddddddddddddddddddssssssssssssssssssssssssssssssssssdddddddddddsssssssssssssssssssssssssssssssssssddddddddddddddssssssssssssssssssssssssssssssssddddddd</p>
          </ProTextBox>
          <Link to="/noteform" onClick={handleModalClose} style={{display:'flex', backgroundColor:'#4e5157', color:'#fff', padding:'20px', justifyContent:'center' , borderRadius:'7px', width:'277px'}}>
            쪽지 보내기
          </Link>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Profile

const ProBox = styled.div`
  width: 140px;
  height: 140px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const ProTextBox = styled.div`
  width: 277px;
  height: auto;
  word-break: break-all; /* 글자를 여러 줄로 강제로 나눕니다. */
  white-space: normal;
  margin-bottom: 10px;
`
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent} from "@mui/material";
import { Link} from 'react-router-dom';
import pro from '../../images/music/music-3.jpg'
import styled from 'styled-components';
import axios from 'axios';
function Profile() {
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };



  return (
    <>
      {/* 프로필 사진 */}
      <a href="#;" onClick={handleModalOpen}>프로필</a>

      {/* 모달 */}
      <Dialog open={isModalOpen} onClose={handleModalClose} style={{zIndex: '999999'}}>
        <DialogContent style={{width:'320px', height:'400px', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <ProBox>
            <img src={pro} alt="" style={{objectFit:'cover', width:'100%', height:'100%'}}/>
          </ProBox>
          <h4 style={{fontSize:'30px', display:'block', marginBottom:'25px'}}>닉네임</h4>
          <ProTextBox>

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
import { useEffect, useRef, useState } from 'react';
import logo from '../../logo.svg';
import './Header.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';
import imge from '../../images/photo/photo02.jpg';
import ClearIcon from '@mui/icons-material/Clear';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNoteBoxOpen, setNoteBoxOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };


  // 모달
  const handleNoteIconClick = () => {
    setNoteBoxOpen(!isNoteBoxOpen);
  };


  return (
    <div className='mo-header'>
      <div className='header-wrap'>
        <div className='logo'>
          <h1>
            <a href='/'>
              <img src={logo} alt='모여영로고' />
            </a>
          </h1>
        </div>
        <div className='nav-box'>
          <ul className='nav'>
            <li className='nav-item'>
              <a href='#;' onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                청년공간
              </a>
              <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                <ul>
                  <li>
                    <a href='#'>청년공간이란?</a>
                  </li>
                  <li>
                    <a href='#'>청년공간 찾아보기</a>
                  </li>
                  <li>
                    <a href='#'>청년TALK</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className='nav-item'>
              <a href='#;'>모임</a>
            </li>
            <li>
              <a href='#;' className='header-btn login'>
                로그인
              </a>
            </li>
            <li>
              <a href='#;' className='header-btn join'>
                회원가입
              </a>
            </li>
            <li className='noteLi'>
              <NoteIconContainer onClick={handleNoteIconClick}>
                <NotificationsIcon />
              </NoteIconContainer>
              {isNoteBoxOpen && (
                <NoteBox>
                  <ClearIcon  onClick={handleNoteIconClick}
                  style={{float: 'right',
                  top: '-20px',
                  position: 'relative'}}/>
                  <p>알림이 없습니다</p>
                </NoteBox>
              )}
            </li>
            <li>
              <MailIcon />
            </li>
            <li>
              <Pro>
                <ProImg src={imge} />
              </Pro>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

const Pro = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  background-color: #ebebeb;
  position: relative;
`;

const ProImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoteIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const NoteBox = styled.div`
  position: absolute;
  top: 100%;
  left: -300px;
  width: 400px;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  padding: 40px 20px;
  border-radius: 10px;
`;

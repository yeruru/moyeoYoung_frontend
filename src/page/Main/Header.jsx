import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../logo.svg';
import './Header.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';
import imge from '../../images/photo/photo02.jpg';
import ClearIcon from '@mui/icons-material/Clear';
import { Link ,useNavigate  } from 'react-router-dom';
import { clearTokens } from '../../persist-store';

import { padding } from '@mui/system';

import axios from 'axios';


function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAlarmBoxOpen, setAlarmBoxOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  // 로그인 부분
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부
  const memberId = useSelector((state) => state.memberId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const expirationTime = localStorage.getItem('expirationTime');
    const currentTime = new Date().getTime();

    if (token && expirationTime && currentTime > expirationTime) {
      // 토큰이 만료된 경우
      dispatch(clearTokens());
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
      navigate('/login');
    } else {
      setIsLoggedIn(!!token);
    }
  }, [dispatch, navigate]);
  
  // 모달
  const handleNoteIconClick = () => {
    setAlarmBoxOpen(!isAlarmBoxOpen);
  };

  // 로그아웃
  const logout = () => {
    dispatch(clearTokens()); // clearTokens 액션을 디스패치하여 로그아웃 처리
    console.log('====로그아웃 되었습니다====');
    localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('refreshToken');
    navigate('/login');
    // document.location.href = '/login'; // 로그아웃 후 홈페이지로 리다이렉트
  };

  
  // 프로필 모달
  const [isProBoxOpen, setProBoxOpen] = useState(false);
  const [isMouseInsideProBox, setMouseInsideProBox] = useState(false);

  const handleProMouseEnter = () => {
    setProBoxOpen(true);
  };

  const handleProMouseLeave = () => {
    setTimeout(() => {
      if (!isMouseInsideProBox) {
        setProBoxOpen(false);
      }
    }, 300);
  };

  const [selectedButton, setSelectedButton] = useState('');

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
            <li className='nav-item'
              onClick={() => setSelectedButton('청년공간')}
            >
              <a href='#;' onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                청년공간
              </a>
              <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                <ul>
                  <li>
                    <Link to='/whatyouth'>청년공간이란?</Link>
                  </li>
                  <li> 
                    <Link to='/youthspacelist/1'>청년공간 찾아보기</Link>
 
                  </li>
                  <li>
                    <Link to='#'>청년TALK</Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className='nav-item'>
              <Link to='/roomlist/1'>모임</Link>
            </li>

            <li>
              {isLoggedIn ? ( // 로그인 상태에 따라 버튼을 다르게 렌더링
                <>
                  <b>{memberId}</b>&nbsp;&nbsp;
                  <a className='header-btn logout' onClick={logout}>
                    로그아웃
                  </a>
                </>
              ) : (
                <Link to='/login' className='header-btn login'>
                  로그인
                </Link>
              )}
            </li>
            {isLoggedIn && (
              <li className={`noteLi ${isAlarmBoxOpen ? 'selected' : ''}`}>
              <AlarmIconContainer onClick={handleNoteIconClick}>
                <NotificationsIcon style={{ color: isAlarmBoxOpen ? 'var(--mo)' : 'inherit' }} />
              </AlarmIconContainer>
                {isAlarmBoxOpen && (
                  <AlarmBox className='alarm-containe'>
                    <ClearIcon onClick={handleNoteIconClick} style={{ float: 'right', top: '-20px', position: 'relative' }} />
                    {/* 알람이 없을경우 */}
                    <p>알림이 없습니다</p>

                    {/* 알람이 있을경우*/}
                    <div className='alarm-modal'>
                      <div>
                        <p><em className='alarm-nick'>이예림닉네임이 이렇게 길어버리면 어쩔</em> 님이 모임에 가입했습니다. 환영해주세요!🎉</p>
                        <div className='alarm-sub'>
                          <em>이예림과 함께하는 CSS모임방</em>
                          <p className='alarm-modal-date'>8시간 전</p>
                        </div>
                      </div>
                    </div>
                    <div className='alarm-modal'>
                      <div>
                        <p><em className='alarm-nick'>옆집아저씨</em> 님이 모임에 가입했습니다. 환영해주세요!🎉</p>
                        <div className='alarm-sub'>
                          <em>이예림과 함께하는 CSS모임방이름이 이렇게 길어버리면 어쩔껀데</em>
                          <p className='alarm-modal-date'>8시간 전</p>
                        </div>
                      </div>
                    </div>
                    <div className='alarm-modal'>
                      <div>
                        <p><em className='alarm-nick'>정세피티</em> 님이 모임에 가입했습니다. 환영해주세요!🎉</p>
                        <div className='alarm-sub'>
                          <em>이예림과 함께하는 CSS모임방</em>
                          <p className='alarm-modal-date'>8시간 전</p>
                        </div>
                      </div>
                    </div>
                    <div className='alarm-modal'>
                      <div>
                        <p><em className='alarm-nick'>천승현띠</em> 님이 모임에 가입했습니다. 환영해주세요!🎉</p>
                        <div className='alarm-sub'>
                          <em>이예림과 함께하는 CSS모임방</em>
                          <p className='alarm-modal-date'>8시간 전</p>
                        </div>
                      </div>
                    </div>
                    <div className='alarm-modal'>
                      <div>
                        <p><em className='alarm-nick'>비누누</em> 님이 모임에 가입했습니다. 환영해주세요!🎉</p>
                        <div className='alarm-sub'>
                          <em>이예림과 함께하는 CSS모임방</em>
                          <p className='alarm-modal-date'>8시간 전</p>
                        </div>
                      </div>
                    </div>
                  </AlarmBox>
                )}
              </li>
            )}
            {isLoggedIn && (
              <li style={{ padding: '0px 30px' }}>
                <a href='/note'>
                  <MailIcon />
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <div onMouseEnter={handleProMouseEnter} onMouseLeave={handleProMouseLeave}>
                  <Pro>
                    <ProImg src={imge} />
                  </Pro>
                  {isProBoxOpen && (
                    <ProBox className='showBox'>
                      <ul className='pro-box' style={{ backgroundColor: '#fff' }}>
                        <li>
                          <Link to={'/mypage'} className='header-link'>
                            마이페이지
                          </Link>
                        </li>
                        <li>
                          <Link to={'/mypage'} className='header-link'>
                            내 모임
                          </Link>
                        </li>
                        <li>
                          <b>{memberId}</b>
                          <a className='header-link' onClick={logout}>
                            로그아웃
                          </a>
                        </li>
                      </ul>
                    </ProBox>
                  )}
                </div>
              </li>
            )}
            {!isLoggedIn && (
            <li>
              <a href='/signup' className='header-btn join'>
                회원가입
              </a>
            </li>
          )}
            {/* <li className='noteLi'>
              <NoteIconContainer onClick={handleNoteIconClick}>
                <NotificationsIcon />
              </NoteIconContainer>
              {isNoteBoxOpen && (
                <NoteBox>
                  <ClearIcon onClick={handleNoteIconClick} style={{ float: 'right', top: '-20px', position: 'relative' }} />
                  <p>알림이 없습니다</p>
                </NoteBox>
              )}
            </li> */}
            {/* <li>
              <MailIcon />
            </li>
            <li>
              <Pro>
                <ProImg src={imge} />
              </Pro>
            </li> */}
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

const AlarmIconContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const AlarmBox = styled.div`
  position: absolute;
`;


const ProBox = styled.div`
  display: none;
  position: relative;
  top: 0;
  right: 100px;
  &.showBox {
    display: block;
  }
`;

const LiSt = styled.li`
  color: ${(props) => (props.selected ? 'var(--mo)' : '#868686')};
`;
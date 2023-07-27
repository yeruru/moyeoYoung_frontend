import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../logo.svg';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import './Header.css';
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import { Link ,useNavigate  } from 'react-router-dom';
import { clearTokens } from '../../persist-store';
import axios from 'axios';
import "../../images/member/normal.png"
import { assertConditionalExpression } from '@babel/types';

import Profile from '../../components/Profile/Profile';
import { current } from '@reduxjs/toolkit';

function Header() {

  // SSE 연결 객체를 저장할 상태
  

  const accessToken = localStorage.getItem("accessToken");
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
  const [isProBoxOpen, setProBoxOpen] = useState(false);
  const [isMouseInsideProBox, setMouseInsideProBox] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const [fileName, setFileName] = useState('normal.png');
  const [previewImage, setPreviewImage] = useState(null);
 
    

  useEffect(() => {
    // 유저 정보 가져오기
     axios
     .get("http://localhost:8090/member/mypage", {
       headers: {
         Authorization: `Bearer ${accessToken}`
       },
     })
     .then((res) => {
       setFileName(res.data.fileName);
       setPreviewImage(`http://localhost:8090/room/view/${res.data.fileName}`);
     })
     .catch((err) => {
       console.log(err);
     });

       // 알림 리스트 불러오기
    fetchNotifications();
  }, [accessToken]);




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
      document.location.reload();
    } else {
      setIsLoggedIn(token);
    }
  }, [dispatch, navigate]);
  
  // 모달
  const handleNoteIconClick = () => {
    console.log(notifications);
    setAlarmBoxOpen(!isAlarmBoxOpen);
  };

  // 로그아웃
  const logout = () => {
    dispatch(clearTokens()); // clearTokens 액션을 디스패치하여 로그아웃 처리
    console.log('====로그아웃 되었습니다====');
    localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('refreshToken');
    navigate('/login');
    window.location.reload();
    // document.location.href = '/login'; // 로그아웃 후 홈페이지로 리다이렉트
  };

  
  // 프로필 모달
  

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


useEffect(() => {
  // SSE 연결 시도
  let eventSource = null;
  if (isLoggedIn) {
    const connectSSE = () => {
    const eventSource = new EventSource('http://localhost:8090/notification/connect?accessToken=' + accessToken);

    eventSource.onopen = () => {
      console.log("SSE connected");
      // 알림 가져오기
      fetchNotifications();
    };

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      const newTimestamp = new Date(newNotification.registeredAt).getTime();
      newNotification.timestamp = newTimestamp;
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
      console.log("newNotification"+newNotification);
      //updateElapsedTime();
       // 읽지 않은 알림 개수 갱신
       fetchNotifications(); // 알림 목록을 다시 불러옴
    };

    eventSource.onerror = (error) => {
      console.error("Error occurred while connecting to SSE.", error);
      connectSSE();
    };
  };

    // 경과 시간 업데이트 함수
    // const updateElapsedTime = () => {
    //   setNotifications((prevNotifications) =>
    //     prevNotifications.map((notification) => ({
    //       ...notification,
    //       elapsedTime: getElapsedTime(notification.timestamp)
    //     }))
    //   );
    // };

    

    // 컴포넌트가 언마운트될 때 SSE 연결 종료 및 인터벌 해제
    return () => {
      eventSource.close();
      //clearInterval(interval);
    };
  }
}, [isLoggedIn, accessToken]);
// 알람조회

const [notifications, setNotifications] = useState([]);
// 읽지 않은 알림 개수 상태
const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
 // 알림 목록을 가져오는 API 호출
 const fetchNotifications = async () => {
  try {
    const response = await axios.get('http://localhost:8090/notification/list', {
      headers: {
        Authorization: `Bearer ${accessToken}` // 헤더에 토큰을 추가
      }
    });
    setNotifications(response.data);
    // 읽지 않은 알림 개수 계산
    setUnreadNotificationCount(response.data.filter((notification) => !notification.isRead).length);

    console.log(response.data); // 확인용 로그: 알림 데이터를 로그로 출력
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};


// 알림을 읽은 상태로 업데이트하는 함수
const markNotificationAsRead = async (notificationId) => {
  try {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
    await axios.put(`http://localhost:8090/notification/read/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}` // 헤더에 토큰을 추가
      }
    });
    console.log("알림을 읽은 상태로 업데이트되었습니다.");

  } catch (error) {
    console.error('Error updating notification:', error);
    // 에러 처리 로직 추가
  }
};

const handleRead=  (notificationId) => {
  markNotificationAsRead(notificationId);
};
// 알림 삭제 API 호출 함수
const handleDeleteNotification = async (notificationId) => {
  try {
    await axios.delete(`http://localhost:8090/notification/delete/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 삭제 성공시 알림 목록을 갱신합니다.
    fetchNotifications();
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};

// 알림 목록에서 알림 삭제 함수
const handleNotificationDelete = (notificationId) => {
  handleDeleteNotification(notificationId);
};

const getElapsedTime = (timestampString) => {
  const currentTime = new Date().getTime(); // 현재 시간
  // const registeredTime = new Date(timestampString).getTime();
  const registeredTime = Date.parse(timestampString);
  console.log(registeredTime);
  const elapsedTime = currentTime - registeredTime;
  console.log(elapsedTime);

  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  if (minutes > 0) return `${minutes}분 전`;
  return '방금 전';
};

  return (
    <div className='mo-header' id='mo-header'>
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
                    <Link to='/ws-chat'>청년TALK</Link>
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
                  {/* 읽지 않은 알림 개수 표시 */}
                  {unreadNotificationCount > 0 && (
                    <NotificationCount className="notification-count" >{unreadNotificationCount}</NotificationCount>
                  )}
                </AlarmIconContainer>
                {isAlarmBoxOpen && (
                  <AlarmBox className='alarm-containe'>
                    <ClearIcon onClick={handleNoteIconClick} style={{ float: 'right', top: '-20px', position: 'relative' }} />
                    {/* 알람이 없을 경우 */}
                    {notifications.length === 0 ? (
                      <p>알림이 없습니다</p>
                    ) : (
                      /* 알람이 있을 경우*/
                      notifications.map((notification) =>  (
                        <div className='alarm-modal' key={notification.id} onClick={() => handleRead(notification.id)}>
                          <div>
                            <p>
                              <em className='alarm-nick'>{notification.type}</em>
                              <IconButton className='alarm_btn' size='small' color='inherit' onClick={() => handleNotificationDelete(notification.id)}>
                                <CleaningServicesOutlinedIcon  />
                              </IconButton><br/>
                              {notification.message}
                            </p>
                            <div className='alarm-sub'>
                              <em>  {notification.senderNickname}</em>
                              <p className='alarm-modal-date'>{getElapsedTime(notification.registerAt)}</p>
                            </div>
                          </div>
                        </div>
                      )).reverse()
                    )}
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
                      <ProImg src={previewImage} />
                  </Pro>
                  {isProBoxOpen && (
                    <ProBox className='showBox'>
                      <ul className='pro-box' style={{ backgroundColor: '#fff' }}>
                        <li>
                          <Link to={'/mypagemain'} className='header-link'>
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
          </ul>
        </div>
      </div>
      {/* 모임방 투두 팡파레 */}
      <canvas id="my-canvas" style={{display: 'none'}}></canvas> 
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
      width: 100%;
    height: 100%;
    object-fit: cover;
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

const NotificationCount = styled.span`
  position: absolute;
  top: -8px;
  right: 4px;
  font-size: 12px;
  background-color: red;
  color: #fff;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../logo.svg';
import './Header.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import styled from 'styled-components';
import imge from '../../images/photo/photo02.jpg';
import ClearIcon from '@mui/icons-material/Clear';
import { clearTokens } from '../../persist-store';

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
  //로그인 부분
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 여부

  // const token = useSelector((state) => state.Authorization);
  const userid = useSelector((state) => state.UserId);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 여부를 확인하여 상태 업데이트
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);


  // 모달
  const handleNoteIconClick = () => {
    setNoteBoxOpen(!isNoteBoxOpen);
  const logout = () => {
    dispatch(clearTokens()); // clearTokens 액션을 디스패치하여 로그아웃 처리
    console.log("====로그아웃 되었습니다====");
    localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('refreshToken');
    document.location.href = '/login'; // 로그아웃 후 홈페이지로 리다이렉트
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
              {isLoggedIn ? ( // 로그인 상태에 따라 버튼을 다르게 렌더링
                <>
                  <b>{userid}</b>&nbsp;&nbsp;
                  <a className='header-btn logout' onClick={logout}>로그아웃</a>
                </>
                ) : (
                  <Link to="/login" className='header-btn login'>로그인</Link>
                )}
              </li>
              {isLoggedIn && (
              <li>
                <Link to={"/mypage"} className='header-btn mypage'>마이페이지</Link>
              </li>
              )}
            <li>
              <a href="/signup" className='header-btn join'>회원가입</a>
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

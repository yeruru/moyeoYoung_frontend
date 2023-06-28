import React, { useState } from 'react';
import logo from '../../logo.svg';
import { Link } from 'react-router-dom';
import './Header.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Header() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  const logout = () => {
    document.location.href = "/";
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
              <a href="#;" onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                청년공간
              </a>
              <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} onMouseEnter={toggleDropdown} onMouseLeave={handleMouseLeave}>
                <ul>
                  <li>
                    <a href="#">청년공간이란?</a>
                  </li>
                  <li>
                    <a href="#">청년공간 찾아보기</a>
                  </li>
                  <li>
                    <a href="#">청년TALK</a>
                  </li>
                </ul>
              </div>
            </li>
            <li className='nav-item'>
              <a href="#;">모임</a>
            </li>
            <li>
              <a href="#;"  className='header-btn login'>로그인</a>
            </li>
            <li>
              <a href="#;" className='header-btn join'>회원가입</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

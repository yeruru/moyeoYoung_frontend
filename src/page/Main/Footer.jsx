import React from 'react'
import logo from '../../logo.svg';
import './Footer.css';

function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='footer-wrap'>
          <div className='logo'>
                <a href='/'>
                  <img src={logo} alt='모여영로고' />
                </a>
                <p className="copy">COPYRIGHT© 2023 모여영. All Right Reserved</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
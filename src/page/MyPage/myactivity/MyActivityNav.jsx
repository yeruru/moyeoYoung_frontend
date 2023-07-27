import React, { useState, useEffect } from 'react';
import '../MyPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function MyActivityNav() {

  const [isAllVaild, setIsAllVaild] = useState(null);
  const [memberId, setMemberId] = useState();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 URL에 따라 상태 초기화
    const currentPath = window.location.pathname;
    if (currentPath === '/myroom') {
      setIsAllVaild('myroom');
    } else if (currentPath === '/myjoinroom') {
      setIsAllVaild('myjoinroom');
    } else if (currentPath === '/myfeed') {
      setIsAllVaild('myfeed');
    } else if (currentPath === '/mybookmark') {
      setIsAllVaild('mybookmark');
    }
    else {
      setIsAllVaild(null);
    }
  }, []);

  const accessToken = localStorage.getItem("accessToken");
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BURL}/feed/getmemberId`,  {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then(res=>{
      setMemberId(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[accessToken])

  const handleBtnClick = (target) => {
    setIsAllVaild((prev) => (prev === target ? null : target));
  };

  return (
    <div className='note-menu'>
      <nav>
        <a href="/mypagemain" className='send-btn'>마이페이지 &nbsp; &gt;</a>
        <ul>
          <li>
            <a href={`/myroom/${memberId}`} className={`note-a ${isAllVaild === 'myroom' ? 'click' : ''}`} onClick={() => handleBtnClick('myroom')}>내 모임방
            </a>
          </li>
          <li> 
            <a href={`/myjoinroom/${memberId}`}className={`note-a ${isAllVaild === 'myjoinroom' ? 'click' : ''}`} onClick={() => handleBtnClick('myjoinroom')}>내 참여방
            </a>
          </li>
          <li>
            <a href={`/myfeed/${memberId}`} className={`note-a ${isAllVaild === 'myfeed' ? 'click' : ''}`} onClick={() => handleBtnClick('myfeed')}>피드 목록
            </a>
          </li>
          <li>
            <a href={`/mybookmark/${memberId}`} className={`note-a ${isAllVaild === 'mybookmark' ? 'click' : ''}`} onClick={() => handleBtnClick('mybookmark')}>관심 목록
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MyActivityNav
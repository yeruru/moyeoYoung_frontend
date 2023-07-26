
import React from 'react'
import './RoomCard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import HttpsIcon from '@mui/icons-material/Https';

export const RoomCard = ({ isBookmark, item }) => { 
  const [backColor, setBackColor] = useState(''); 
  const axiosURL = axios.create({
    baseURL: process.env.REACT_APP_BURL+'/room', // 기본 경로 설정
  });
  const [bookmark, setBookmark] = useState(isBookmark);
  const navigate  = useNavigate();
  const [isClosed,setIsClosed] = useState();

  useEffect(() => {
    switch (item.roomCategory) {
      case '취업준비': setBackColor('blue'); break;
      case '스터디': setBackColor('lblue'); break;
      case '과외/멘토': setBackColor('orange'); break;
      case '자기개발': setBackColor('green'); break;
      case '프로젝트': setBackColor('purple'); break;
      case '동아리': setBackColor('pink'); break;
      case '친목': setBackColor('yellow'); break;
      case '기타': setBackColor('gray'); break;
      default :setBackColor('gray'); 
    }
    if(item.roomType==='close'){
      setIsClosed(true);
    }else{
      setIsClosed(false);
    }
  }, [])

  const callBookmark = (e) => {
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken===null){
      e.preventDefault();
      alert('로그인이 필요합니다');
      navigate('/login');
  } 
  e.preventDefault();
    axiosURL.get(`/bookmark/${e.target.id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
    }
    },{
      params: {
        status: bookmark
      }
    })
      .then(res => {
        setBookmark(!bookmark);
      })
      .catch(err => {
        console.log(err);
      })

  }
  return ( 
    <div id='room-card'>
      <Link to={`/roomMain/dashboard/${item.roomId}`} className='a-mark'> 
        <button className='bookmark'><span id={item.roomId} className={`material-symbols-outlined mark-icon ${bookmark ? 'click' : ''}`} onClick={callBookmark}>
 
          bookmark
        </span></button>
        <img src={process.env.REACT_APP_BURL+`/room/view/${item.roomImage}`} className='card-img' alt='방 썸네일 사진' />
       <p className='p2'>{item.roomTitle}</p>
        <p className="intro">{item.roomContent}</p>

        <div className='mini-sec'>
          <p className={`p3 ${backColor}`}>#{item.roomCategory}</p>
          <div className='mini-sec2'> 
            { isClosed &&
              <HttpsIcon className='httpsIcon'/>}
            <span className="material-symbols-outlined group-icon">
              group
            </span><span className='p4'>{item.roomUserCnt}</span> 
          </div>
        </div> 
        </Link> 
    </div>
  )
}

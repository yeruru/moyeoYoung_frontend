
import React from 'react'
import './RoomCard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const RoomCard = ({ isBookmark, roomId, title, memCnt, category, content, imgName }) => {
  const [backColor, setBackColor] = useState('');
  const instance = axios.create({
    baseURL: 'http://localhost:8090', // 기본 경로 설정
  });
  const [bookmark, setBookmark] = useState(isBookmark); 
  useEffect(() => { 
    switch (category) {
      case '취업준비': setBackColor('blue'); break;
      case '스터디': setBackColor('lblue'); break;
      case '과외/멘토': setBackColor('orange'); break;
      case '자기개발': setBackColor('green'); break;
      case '프로젝트': setBackColor('purple'); break;
      case '동아리': setBackColor('pink'); break;
      case '친목': setBackColor('yellow'); break;
      case '기타': setBackColor('gray'); break;
    }
 
  }, [])

 
  const callBookmark=(e)=>{
    e.preventDefault();    
    instance.get(`/bookmark/${e.target.id}`,{
      params: {
        status: bookmark
      }
    })
    .then(res=>{ 
      console.log(res.data);
      setBookmark(!bookmark);
    })
    .catch(err=>{
      console.log(err);
    })

  }
  return (

    <div id='room-card'>
      <a href="#" className='a-mark'>
        <button className='bookmark'><span id={roomId} className={`material-symbols-outlined mark-icon ${bookmark? 'click':''}`} onClick={callBookmark}>
          bookmark
        </span></button>
        <img src={`http://localhost:8090/view/${imgName}`} className='card-img' />
        <p className='p2'>{title}</p>
        <p className="intro">{content}</p>

        <div className='mini-sec'>
          <p className={`p3 ${backColor}`}>#{category}</p>
          <div className='mini-sec2'>
            <span className="material-symbols-outlined group-icon">
              group
            </span><span className='p4'>{memCnt}</span>
          </div>
        </div>
      </a>
    </div>

  )
}

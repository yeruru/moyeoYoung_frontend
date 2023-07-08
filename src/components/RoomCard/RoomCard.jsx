
import React from 'react'
import './RoomCard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const RoomCard = ({ isBookmark, item }) => { 
// export const RoomCard = ({ isBookmark, roomId, title, memCnt, category, content, imgName }) => {
  const [backColor, setBackColor] = useState('');
  const [detail, setDetail] = useState(item.roomContent.replace(/<br\/>/g, ''));
  const instance = axios.create({
    baseURL: 'http://localhost:8090/room', // 기본 경로 설정
  });
  const [bookmark, setBookmark] = useState(isBookmark); 
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
      setBookmark(!bookmark);
    })
    .catch(err=>{
      console.log(err);
    })

  }
  return (
    
    <div id='room-card'> 
  <a href="#" className='a-mark'>
        <button className='bookmark'><span id={item.roomId} className={`material-symbols-outlined mark-icon ${bookmark? 'click':''}`} onClick={callBookmark}>
          bookmark
        </span></button>
        <img src={`http://localhost:8090/room/view/${item.roomImage}`} className='card-img' />
        <p className='p2'>{item.roomTitle}</p>
        <p className="intro">{detail}</p>

        <div className='mini-sec'>
          <p className={`p3 ${backColor}`}>#{item.roomCategory}</p>
          <div className='mini-sec2'>
            <span className="material-symbols-outlined group-icon">
              group
            </span><span className='p4'>{item.roomUserCnt}</span>
          </div>
        </div>
      </a> 
    </div>

  )
}

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomPlay from "./RoomPlay";
import './RoomPlay.css';
import RoomHeader from './Main/RoomHeader/RoomHeader';
import RoomFeed from './RoomContent/Feed/RoomFeed';
import RoomAnno from './RoomContent/Announcements/RoomAnno';
import Dashboard from './RoomContent/dashboard/Dashboard';
import test from '../../images/illust/test.jpg';
import WriteFeed from './RoomContent/Feed/WriteFeed';

function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState('dashboard'); // 대시보드로 초기값 설정

  useEffect(() => {
    const path = location.pathname;
    const content = path.split('/').pop();
    setSelectedContent(content);
  }, [location]);

  const handleContentChange = (content) => {
    setSelectedContent(content);
    navigate(`/roomMain/${content}`);
  };

  return (
    
    <div className='roomh'>
      <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={test} alt='모임방 프로필 사진'/></div>
            <h2>이예림과 함께 하는 뿌셔뿌셔</h2>
            <a href='#'>모임 정보 수정 &gt;</a>
          </div>
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box'}}>
          {selectedContent === 'dashboard' && <Dashboard/>} {/* 대시보드 컴포넌트 추가 */}
          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange}/>}
          {selectedContent === 'roomAnno' && <RoomAnno/>}
          {selectedContent === 'writefeed' && <WriteFeed/>}
        </div>
        <div className='play'>
          <RoomPlay />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;

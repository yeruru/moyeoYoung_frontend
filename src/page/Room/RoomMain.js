import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomPlay from "./RoomPlay";
import './RoomPlay.css';
import RoomHeader from './Main/RoomHeader/RoomHeader';
import RoomFeed from './RoomContent/Feed/RoomFeed';
import RoomAnno from './RoomContent/Announcements/RoomAnno';

// content안에서 메뉴들을 보여줘야 하기 때문에 url이 바뀌지 않는것 처리
function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState('');

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
    <>
      <div className='flex-box'>
        <div className='room-header'>
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px' }}>
          {selectedContent === 'roomFeed' && <RoomFeed />}
          {selectedContent === 'roomAnno' && <RoomAnno />}
        </div>
        <div className='play'>
          <RoomPlay />
        </div>
      </div>
    </>
  );
}

export default RoomMain;

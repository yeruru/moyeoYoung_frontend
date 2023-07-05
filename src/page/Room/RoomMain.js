import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RoomPlay from "./RoomPlay";
import './RoomPlay.css';
import RoomHeader from './Main/RoomHeader/RoomHeader';
import RoomFeed from './RoomContent/Feed/RoomFeed';
import RoomAnno from './RoomContent/Announcements/RoomAnno';
import Dashboard from './RoomContent/dashboard/Dashboard';
import test from '../../images/illust/test.jpg';
import WriteFeed from './RoomContent/Feed/WriteFeed';
import axios from 'axios';

function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(''); // 대시보드로 초기값 설정
  const [room, setRoom] = useState({ roomId: 0, roomTitle: '', roomContent: '', roomImage: '', roomCategory: '', roomCreateDate: '',roomType: '',userId: 0,roomUserCnt: 0})
  let { roomId } = useParams();

  useEffect(() => {
    const path = location.pathname;
    const content = path.split('/')[path.split('/').length-2];
    console.log("content: " + content)
    setSelectedContent(content);
  }, [location]);

  useEffect(()=>{
    axios.get(`http://localhost:8090/getroomMain/${roomId}`)
    .then(res => {
      setRoom(res.data);
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])

  const handleContentChange = (content) => {
    setSelectedContent(content);
    // navigate(`/roomMain/${content}`);
    navigate(`/roomMain/${content}/${roomId}`);
  };

  return (
    <div className='roomh'>
      <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={`http://localhost:8090/view${room.roomImage}`} alt='모임방 프로필 사진'/></div>
            <h2>{room.roomTitle}</h2> 
            <a href='#'>모임 정보 수정 &gt;</a>
          </div>
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box'}}>
          {selectedContent === 'dashboard' && <Dashboard roomId={roomId} room={room}/>} {/* 대시보드 컴포넌트 추가 */}
          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange}/>}
          {selectedContent === 'roomAnno' && <RoomAnno/>}
          {selectedContent === 'writefeed' && <WriteFeed roomId={roomId}/>}
        </div>
        <div className='play'>
          <RoomPlay />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;

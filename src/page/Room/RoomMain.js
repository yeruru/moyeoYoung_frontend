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
import { Link } from 'react-router-dom';
import ModifyFeed from './RoomContent/Feed/ModifyFeed';

function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [selectedContent, setSelectedContent] = useState(''); // 대시보드로 초기값 설정
  const [room, setRoom] = useState({ roomId: 0, roomTitle: '', roomContent: '', roomImage: '', roomCategory: '', roomCreateDate: '',roomType: '',userId: 0,roomUserCnt: 0})
  let { roomId } = useParams();
  const axiosURL = axios.create({
    baseURL: 'http://localhost:8090/room', // 기본 경로 설정
});
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken'); 
    const path = location.pathname;
    const content = path.split('/')[path.split('/').length-2];
    setSelectedContent(content);
    setAccessToken(localStorage.getItem('accessToken'));
  }, [location]);

  useEffect(()=>{
    axiosURL.get(`/getroomMain/${roomId}`)
    .then(res => {
      setRoom(res.data);
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

  const joinRoom=()=>{
    axiosURL.post('/joinRoom',{
      headers: {
        'Authorization': `Bearer ${accessToken}`
    },
      params:{
        roomId:{roomId},
      }
    })
    .then(res=>{
      console.log("가입완료");
    })
    .catch(err=>{
      console.log("가입실패");
    })
  }
  return (
    <div className='roomh'>
      <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={`http://localhost:8090/room/view/${room.roomImage}`}className='img' alt='모임방 프로필 사진'/></div>
            <h2>{room.roomTitle}</h2> 
            <Link to={`/settingroom/${roomId}`}>모임 정보 수정 &gt;</Link>
          </div>
          <button onClick={joinRoom}>가입하기</button>
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box'}}>
          {selectedContent === 'dashboard' && <Dashboard roomId={roomId} room={room}/>} {/* 대시보드 컴포넌트 추가 */}
          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange}/>}
          {selectedContent === 'roomAnno' && <RoomAnno/>}
          {selectedContent === 'writefeed' && <WriteFeed roomId={roomId}/>}
          {selectedContent === 'modifyfeed' && <ModifyFeed/>}
        </div>
        <div className='play'>
          <RoomPlay />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;

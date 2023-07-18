import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RoomPlay from "./RoomPlay";
import './RoomPlay.css';
import RoomHeader from './Main/RoomHeader/RoomHeader';
import RoomFeed from './RoomContent/Feed/RoomFeed';
import RoomAnno from './RoomContent/Announcements/RoomAnno';
import WriteAnno from './RoomContent/Announcements/WriteAnno';
import DetailAnno from './RoomContent/Announcements/DetailAnno';
import EditAnno from './RoomContent/Announcements/EditAnno';
import Dashboard from './RoomContent/dashboard/Dashboard';
import test from '../../images/illust/test.jpg';
import WriteFeed from './RoomContent/Feed/WriteFeed';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModifyFeed from './RoomContent/Feed/ModifyFeed';

function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedContent, setSelectedContent] = useState(''); // 대시보드로 초기값 설정
  const [room, setRoom] = useState({ roomId: 0, roomTitle: '', roomContent: '', roomImage: '', roomCategory: '', roomCreateDate: '',roomType: '',userId: 0,roomUserCnt: 0})
  let { roomId } = useParams();

  useEffect(() => {
    const path = location.pathname;
    const content = path.split('/')[path.split('/').length-2];
    setSelectedContent(content);
    console.log(content);
  }, [location]);

  useEffect(()=>{
    axios.get(`http://localhost:8090/room/getroomMain/${roomId}`)
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

  return (
    <div className='roomh'>
      <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={`http://localhost:8090/room/view/${room.roomImage}`}className='img' alt='모임방 프로필 사진'/></div>
            <h2>{room.roomTitle}</h2> 
            <Link to={`/settingroom/${roomId}`}>모임 정보 수정 &gt;</Link>
          </div>
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box'}}>
          {selectedContent === 'dashboard' && <Dashboard roomId={roomId} room={room}/>} {/* 대시보드 컴포넌트 추가 */}
          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange}/>}

          {/* 세훈의 공지사항 페이지 */}
          {selectedContent === 'roomAnno' && <RoomAnno />}
          {selectedContent === 'writeAnno' && <WriteAnno />}
          {selectedContent === 'detailAnno' && <DetailAnno />}
          {selectedContent === 'editAnno' && <EditAnno />}


          {selectedContent === 'writefeed' && <WriteFeed roomId={roomId}/>}
          {selectedContent === 'modifyfeed' && <ModifyFeed roomId={roomId}/>}
        </div>
        <div className='play'>
          <RoomPlay />
        </div>
      </div>
    </div>
  );
}

export default RoomMain;

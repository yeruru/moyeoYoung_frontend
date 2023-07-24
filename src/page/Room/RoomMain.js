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
import Chat from '../Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { MemberList } from './RoomContent/MemberList/MemberList';

function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [selectedContent, setSelectedContent] = useState(''); // 대시보드로 초기값 설정
  const [room, setRoom] = useState({ roomId: 0, roomTitle: '', roomContent: '', roomImage: '', roomCategory: '', roomCreateDate: '', roomType: '', userId: 0, roomUserCnt: 0 })
  let { roomId } = useParams();
  const axiosURL = axios.create({
    baseURL: 'http://localhost:8090/room', // 기본 경로 설정
  });

  //유저상태 : 미로그인(noUser) / 멤버(okMember) / 멤버아님(noMember)
  const [userState, setUserState] = useState('noUser');
  /* MemberList 관련 */
  const [memberList, setMemberList] = useState([]);
  const [hostId, setHostId] = useState(0);


  useEffect(() => {
    const path = location.pathname;
    const content = path.split('/')[path.split('/').length - 2];
    setSelectedContent(content);

    axiosURL.get(`/getroomMain/${roomId}`)
      .then(res => {
        setRoom(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    //유저상태처리
    const isToken = localStorage.getItem('accessToken');
    if (isToken) {
      setAccessToken(isToken);
      axiosURL.get(`/memberList/${roomId}`, {
        headers: {
          'Authorization': `Bearer ${isToken}`
        },
      })
        .then((res) => {
          const members = res.data.list;
          setMemberList(members);
          setHostId(res.data.hostId);
          //방 멤버와 로그인된 아이디를 비교 
          const ismember = members.some((item) => res.data.logInId === item.memberId);
          if (ismember) {
            setUserState('okMember');
          } else {
            setUserState('noMember');
          }
        })
        .catch(err => {
          console.log(err);
        })
    }

  }, [location, userState,axiosURL, roomId]);

  const handleContentChange = (content) => {
    setSelectedContent(content);
    // navigate(`/roomMain/${content}`);
    navigate(`/roomMain/${content}/${roomId}`);
  };
  const joinRoom = (e) => {
    if (userState === 'noUser') {
      e.preventDefault();
      alert("로그인이 필요합니다!");
      navigate('/login');
    } else {
      axiosURL.post('/joinRoom', { roomId: roomId }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      })
        .then(res => {
          alert(res.data);
          setUserState('okMember');
        })
        .catch(err => {
          alert(err);
        })
    }
  }
  const openCustomWindow = () => {
    const width = 400;
    const height = 600;
    window.open(`http://localhost:3000/chat/${roomId}`, '_blank', `width=${width}, height=${height}`)
  }

  return (
    <div className='roomh'>
      <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={`http://localhost:8090/room/view/${room.roomImage}`} className='img' alt='모임방 프로필 사진' /></div>
            <h2>{room.roomTitle}</h2>
            <Link to={`/settingroom/${roomId}`}>모임 정보 수정 &gt;</Link>
          </div>
          {
            userState !== 'okMember' &&
            <button onClick={joinRoom} className='join-btn'>가입하기</button>
          }
          <RoomHeader onContentChange={handleContentChange} />
        </div>
        <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box' }}>
          {selectedContent === 'dashboard' && <Dashboard roomId={roomId} room={room} />} {/* 대시보드 컴포넌트 추가 */}
          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange} />}

          {/* 세훈의 공지사항 페이지 */}
          {selectedContent === 'roomAnno' && <RoomAnno />}
          {selectedContent === 'writeAnno' && <WriteAnno />}
          {selectedContent === 'detailAnno' && <DetailAnno />}
          {selectedContent === 'editAnno' && <EditAnno />}


          {selectedContent === 'writefeed' && <WriteFeed roomId={roomId} />}
          {selectedContent === 'modifyfeed' && <ModifyFeed />}

          {/* 멤버리스트 */}
          {
            selectedContent === 'roomMember' &&
            <MemberList hostId={hostId} memberList={memberList} />
          }
        </div>
        <div className='play'>
          <RoomPlay />
          <div>
            <button className="Chatbutton" onClick={openCustomWindow} >
              <ChatBubbleIcon style={{ position: 'relative', top: '2px', paddingRight: '10px' }} />모임톡방 입장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomMain;

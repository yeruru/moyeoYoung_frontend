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
// import test from '../../images/illust/test.jpg';
import WriteFeed from './RoomContent/Feed/WriteFeed';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ModifyFeed from './RoomContent/Feed/ModifyFeed';
// import Chat from '../Chat/Chat';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { MemberList } from './RoomContent/MemberList/MemberList';
// import { Login } from '@mui/icons-material';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';


function RoomMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState('');
  const [selectedContent, setSelectedContent] = useState(''); // 대시보드로 초기값 설정
  const [room, setRoom] = useState({ roomId: 0, roomTitle: '', roomContent: '', roomImage: '', roomCategory: '', roomCreateDate: '', roomType: '', userId: 0, roomUserCnt: 0 })
  let { roomId } = useParams();
  const axiosURL = axios.create({
    baseURL: process.env.REACT_APP_BURL+'/room', // 기본 경로 설정
  });

  //유저상태 : 미로그인(noUser) / 멤버(okMember) / 멤버아님(noMember)
  const [userState, setUserState] = useState('noUser');
  /* MemberList 관련 */
  const [memberList, setMemberList] = useState([]);
  const [logInId, setLogInId] = useState(0);
  const [isJoin, setIsJoin] = useState(false);
  const [joining, setJoining] = useState(false);
  // 방 나가기
  const [isLeaveModal, setLeaveModal] = useState(false);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const content = path.split('/')[path.split('/').length - 2];
    setSelectedContent(content);


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
          setLogInId(res.data.logInId);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, isJoin, roomId]);

  useEffect(() => {
    axiosURL.get(`/getroomMain/${roomId}`)
      .then(res => {
        setRoom(res.data);
        setIsView(true);
      })
      .catch(err => {
        console.log(err);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleContentChange = (content) => {
    setSelectedContent(content);
    // navigate(`/roomMain/${content}`);
    navigate(`/roomMain/${content}/${roomId}`);
  };
  const joinRoom = _.debounce((e) => {
    if (joining) {
      return;
    }

    if (userState === 'noUser') {
      e.preventDefault();
      alert("로그인이 필요합니다!");
      navigate('/login');
    } else {
      setJoining(true); // 가입 시작
      
      axiosURL.post('/joinRoom', { roomId: roomId }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      })
        .then(res => {
          alert(res.data);
          setUserState('okMember');
          setIsJoin(true);
        })
        .catch(err => {
          alert(err);
        })
        .finally(() => {
          setJoining(false); // 가입 완료
        });
    }
  }, 500);
  const openCustomWindow = () => {
    if (userState !== 'okMember') {
      alert("멤버만 입장할 수 있습니다!");
    } else {
      const width = 400;
      const height = 600;
      window.open(process.env.REACT_APP_BURL+`/chat/${roomId}`, '_blank', `width=${width}, height=${height}`)
    }
  }
  const offLeaveModal=()=>{
    setLeaveModal(false);
  }
  const leaveRoomModal = () => {
    setLeaveModal(true);
  }
  const leaveRoom = () => {
    axiosURL.post(`/deletemember/${logInId}/${roomId}`)
      .then((res) => {
        alert('탈퇴가 완료되었습니다');
        setUserState('noMember');
        document.location.href = `/roomMain/dashboard/${roomId}`;
      })
      .catch((err) => {
        console.log(err);
      })

  }

  console.log(userState);

  return (
    <div className='roomh'>
      { isView && ( <>
        <div className='flex-box'>
        <div className='room-header'>
          <div className='title-box'>
            <div className='img-box'><img src={process.env.REACT_APP_BURL+`/room/view/${room.roomImage}`} className='img' alt='모임방 프로필 사진' /></div>
            <h2>{room.roomTitle}</h2>
            {
              room.memberId === logInId &&
              <Link to={`/settingroom/${roomId}`}>모임 정보 수정 &gt;</Link>
            }
          </div>
          {
            // userState !== 'okMember' &&
            // <button onClick={joinRoom} className='join-btn'>가입하기</button>

            userState !== 'okMember' && (
              <button onClick={joinRoom} className='join-btn' disabled={joining}>
                가입하기
              </button>
            )
          }
          <RoomHeader onContentChange={handleContentChange} />
          {userState === 'okMember' && logInId !== room.memberId &&
            <div className='leave-room-div'>
              <button onClick={leaveRoomModal} className='leave-room'>방 나가기</button>
            </div>
          }


        </div>
        { 
        (room.roomType==='close' && userState !== 'okMember' && selectedContent !=='dashboard') &&
         <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box' }}>
          <div className='w-p'> 
           <img src='/image/Group 51.svg' alt="No access" width="600" height="200" />
           <p className='not-access'>멤버에게만 공개된 방입니다!</p> 
          </div>
          </div>
        } 
        { 
        (room.roomType==='close' && userState !== 'okMember' && selectedContent ==='dashboard') &&
          <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box' }}>
            <Dashboard roomId={roomId} room={room} state={userState} roomstate={room.roomType}/>
          </div>
        }
         
        { (room.roomType==='open' || userState === 'okMember') &&
          <div className='content' style={{ width: '700px', backgroundColor: '#f5f5f5', padding: '20px', boxSizing: 'border-box' }}>
          {selectedContent === 'dashboard' && <Dashboard roomId={roomId} room={room} state={userState} roomstate={room.roomType}/>} {/* 대시보드 컴포넌트 추가 */}

          {selectedContent === 'roomFeed' && <RoomFeed onContentChange={handleContentChange} state={userState} room={room.roomType}/>}

          {/* 세훈의 공지사항 페이지 */}
          {selectedContent === 'roomAnno' && <RoomAnno state={userState} room={room.roomType}/>}
          {selectedContent === 'writeAnno' && <WriteAnno />}
          {selectedContent === 'detailAnno' && <DetailAnno />}
          {selectedContent === 'editAnno' && <EditAnno />}
 
          {selectedContent === 'writefeed' && <WriteFeed roomId={roomId} />}
          {selectedContent === 'modifyfeed' && <ModifyFeed />}

            {/* 멤버리스트 */}
            {
              selectedContent === 'roomMember' &&
              <MemberList hostId={room.memberId} memberList={memberList} />
            }
          </div> 
        }
        <div className='play'>
          <RoomPlay />
          <div>
            <button className="Chatbutton" onClick={openCustomWindow} >
              <ChatBubbleIcon style={{ position: 'relative', top: '2px', paddingRight: '10px' }} />모임톡방 입장</button>
          </div>
        </div>
      </div> 
      <div id='leave-room-modal' className={`hidden ${isLeaveModal ? 'show' : ''}`}>
        <div className="modal-box">
          <CloseIcon id="icon" onClick={offLeaveModal} />
          <p className='txt'>정말로 방을 나가시겠습니까?</p>
          <div className="modal-imgdiv">
            <img src="/image/group 67.svg" className='modal-img' alt='메세지 보내는 그림' />
          </div>
          <div className="modal-btns">
            <button type='button' className="btn btn1" onClick={offLeaveModal}>돌아가기</button>
            <button type='submit' className="btn btn2" onClick={leaveRoom}>삭제하기</button>
          </div>
        </div>
      </div></>)
}
    </div>
  );
}

export default RoomMain;

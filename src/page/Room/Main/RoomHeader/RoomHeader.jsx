import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

function RoomHeader({ onContentChange }) {
  const [selectedButton, setSelectedButton] = useState('');
  const location = useLocation();
  //유저상태 : 미로그인(noUser) / 멤버(okMember) / 멤버아님(noMember)
  const [userState, setUserState] = useState('noUser');
  /* MemberList 관련 */
  const [memberList, setMemberList] = useState([]);
  const [logInId, setLogInId] = useState(0);
  const [isJoin, setIsJoin] = useState(false);

  const [accessToken, setAccessToken] = useState('');
  const axiosURL = axios.create({
    baseURL: 'http://localhost:8090/room', // 기본 경로 설정
  });

  let { roomId } = useParams();

  useEffect(() => {
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
  
  useEffect(()=>{
    const content= location.pathname.split("/")[2];
    setSelectedButton(content);
  },[]);

  const handleLinkClick = (content) => {
    setSelectedButton(content);
    onContentChange(content);
    console.log(content);
  };

  return (
    <StyleUl>
      <StyleLi>
          <ButtonSt
          onClick={() => handleLinkClick('dashboard')}
          selected={selectedButton === 'dashboard'}
          >
            대시보드
          </ButtonSt>
      </StyleLi>
      <StyleLi>
        {
          userState === 'okMember' && 
            <ButtonSt
              onClick={() => handleLinkClick('roomAnno')}
              selected={selectedButton === 'roomAnno'}
            >
              모임 공지사항
        </ButtonSt>
        }
      </StyleLi>
      <StyleLi>
      {
        userState === 'okMember' && 
        <ButtonSt
          onClick={() => handleLinkClick('roomFeed')}
          selected={selectedButton === 'roomFeed'}
        >
          모임 피드
        </ButtonSt>
      }
      </StyleLi>
      <StyleLiM>
      {
        userState === 'okMember' && 
        
        <ButtonSt 
        style={{display: 'flex', alignItems: 'center'}}
        onClick={() => handleLinkClick('roomMember')}
        selected={selectedButton === 'roomMember'}
        >
          <SettingsIcon style={{marginRight:'7px'}}></SettingsIcon>
          멤버보기
        </ButtonSt>
        }
      </StyleLiM>
    </StyleUl>
  );
}

export default RoomHeader;

const StyleUl = styled.ul`
  margin-top: 50px;
`;

const StyleLi = styled.li`
  margin-bottom: 20px;
`;

const StyleLiM = styled.li`
  display: flex;
  margin-top: 140px;
`;

const ButtonSt = styled.button`
  border: 0;
  font-size: 18px;
  color: ${(props) => (props.selected ? 'var(--mo)' : '#868686')};
  font-family: inherit;
  background: none; /* 백그라운드 속성 제거 */
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsIcon from '@mui/icons-material/Settings';

function RoomHeader({ onContentChange }) {
  const [selectedButton, setSelectedButton] = useState('dashboard');

  const handleLinkClick = (content) => {
    setSelectedButton(content);
    onContentChange(content);
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
        <ButtonSt
          onClick={() => handleLinkClick('roomAnno')}
          selected={selectedButton === 'roomAnno'}
        >
          모임 공지사항
        </ButtonSt>
      </StyleLi>
      <StyleLi>
        <ButtonSt
          onClick={() => handleLinkClick('roomFeed')}
          selected={selectedButton === 'roomFeed'}
        >
          모임 피드
        </ButtonSt>
      </StyleLi>
      <StyleLiM>
        
        <ButtonSt 
        style={{display: 'flex', alignItems: 'center'}}
        onClick={() => handleLinkClick('roomMember')}
        selected={selectedButton === 'roomMember'}
        >
          <SettingsIcon style={{marginRight:'7px'}}></SettingsIcon>
          멤버설정
        </ButtonSt>
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

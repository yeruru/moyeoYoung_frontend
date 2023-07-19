import React, { useState, useEffect } from 'react';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import SendIcon from '@mui/icons-material/Send';
import './Note.css';

function NoteMenu() {
  const [isAllVaild, setIsAllVaild] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 URL에 따라 상태 초기화
    const currentPath = window.location.pathname;
    if (currentPath === '/note') {
      setIsAllVaild('received');
    } else if (currentPath === '/sendnote') {
      setIsAllVaild('sent');
    } else {
      setIsAllVaild(null);
    }
  }, []);

  const handleBtnClick = (target) => {
    setIsAllVaild((prev) => (prev === target ? null : target));
  };

  return (
    <div className='note-menu'>
      <nav>
        <a href="noteform" className='send-btn'>쪽지쓰기</a>
        <ul>
          <li>
            <a href="/note" className={`note-a ${isAllVaild === 'received' ? 'click' : ''}`} onClick={() => handleBtnClick('received')}>
              <MarkunreadIcon />받은쪽지함
            </a>
          </li>
          <li>
            <a href="/sendnote" className={`note-a ${isAllVaild === 'sent' ? 'click' : ''}`} onClick={() => handleBtnClick('sent')}>
              <SendIcon />보낸쪽지함
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NoteMenu;

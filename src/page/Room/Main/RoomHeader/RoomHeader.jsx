import React from 'react';

function RoomHeader({ onContentChange }) {
  const handleLinkClick = (content) => {
    onContentChange(content);
  };

  return (
    <ul>
      <li>대시보드</li>
      <li>
        <button onClick={() => handleLinkClick('roomAnno')}>
          모임 공지사항
        </button>
      </li>
      <li>
        <button onClick={() => handleLinkClick('roomFeed')}>
          모임 피드
        </button>
      </li>
    </ul>
  );
}

export default RoomHeader;

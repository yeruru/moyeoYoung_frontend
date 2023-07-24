import React, { useState, useEffect } from 'react';

function Timer({ commentCreateDate }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const createDateTime = new Date(commentCreateDate).getTime();
      const timeDiff = now - createDateTime;

      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
      const twoDays = 2 * day;

      if (timeDiff < minute) {
        setTimeString('방금 전');
      } else if (timeDiff < hour) {
        const minutesAgo = Math.floor(timeDiff / minute);
        setTimeString(`${minutesAgo}분 전`);
      } else if (timeDiff < day) {
        const hoursAgo = Math.floor(timeDiff / hour);
        setTimeString(`${hoursAgo}시간 전`);
      } else if (timeDiff < twoDays) {
        setTimeString('어제');
      } else {
        const daysAgo = Math.floor(timeDiff / day);
        setTimeString(`${daysAgo}일 전`);
      }
    };

    updateTime();
    const timerInterval = setInterval(updateTime, 60 * 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [commentCreateDate]);

  return <span className='timer'>{timeString}</span>;
}

export default Timer;

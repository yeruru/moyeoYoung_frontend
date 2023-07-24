import React, { useState } from 'react';
import { Button } from '@mui/material';

function FilterButtons({ setFilter }) {
  const [active, setActive] = useState('all');

  const handleAllClick = () => {
    setActive('all');
    setFilter('all');
  };

  const handleActiveClick = () => {
    setActive('active');
    setFilter('active');
  };

  const handleCompletedClick = () => {
    setActive('completed');
    setFilter('completed');
  };

  const style = {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
      borderBottom: '1px solid #ddd',
      width: '400px',
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '0',
      backgroundColor: 'transparent',
      color: active === 'all' ? '#1EC078' : 'grey',
      cursor: 'pointer',
      width: '33.3%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    activeButton: {
      display: 'inline-block',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '0',
      backgroundColor: 'transparent',
      color: active === 'active' ? '#1EC078' : 'grey',
      cursor: 'pointer',
      width: '33.3%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    completedButton: {
      display: 'inline-block',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '0',
      backgroundColor: 'transparent',
      color: active === 'completed' ? '#1EC078' : 'grey',
      cursor: 'pointer',
      width: '33.3%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    }
  }

  return (
    <div style={style.container}>
      <Button style={style.button} onClick={handleAllClick}>전체보기</Button>
      <Button style={style.activeButton} onClick={handleActiveClick}>하는중</Button>
      <Button style={style.completedButton} onClick={handleCompletedClick}>완료</Button>
    </div>
  );
}

export default FilterButtons;

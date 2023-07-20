import React, { useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link } from 'react-router-dom';
import NoteMenu from './NoteMenu';


function NoteDetail() {
  // 글자 수 제한
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterCount = 300;

  const handleTextareaChange = (event) => {
    const text = event.target.value;
    const currentCharacterCount = text.length;
    
    // 300자를 초과하여 입력한 경우, 입력이 더 이상 되지 않도록 제한합니다.
    if (currentCharacterCount <= maxCharacterCount) {
      setCharacterCount(currentCharacterCount);
    } else {
      setCharacterCount(maxCharacterCount);
      event.target.value = text.slice(0, maxCharacterCount);
    }
  };


  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
      <div className='note-flex'>
          <div>
            <h3 className='note-title'>쪽지쓰기</h3>
            <div className='send-window'>
              <div className='send-area'>
                <span>받는사람</span>
                <input type="text" placeholder='보내는 사람의 이메일을 입력해 주세요.' className='note-email'/>
                <button className='send-btn'>보내기</button>
              </div>
              <div className='writing-area'>
                <textarea name="" id="" cols="5" rows="55" title='쪽지 내용을 입력해 주세요.' 
                style={{resize:'none'}}
                onChange={handleTextareaChange}
                >
                </textarea>
              </div>
              <div className='character'>
                <span>{characterCount}</span>/<span>{maxCharacterCount}</span>자
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
import React, { useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link } from 'react-router-dom';
import NoteMenu from './NoteMenu';
import axios from 'axios';

function NoteDetail() {
  // 글자 수 제한
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterCount = 300;
  
  const handleTextareaChange = (event) => {
    const text = event.target.value;
    const currentCharacterCount = text.length;
    const name = event.target.name;
    const value = event.target.value;
    setNote({...note, [name]:value}) 
    // 300자를 초과하여 입력한 경우, 입력이 더 이상 되지 않도록 제한합니다.
    if (currentCharacterCount <= maxCharacterCount) {
      setCharacterCount(currentCharacterCount);
    } else {
      setCharacterCount(maxCharacterCount);
      event.target.value = text.slice(0, maxCharacterCount);
    }
  };
  const accessToken = localStorage.getItem('accessToken');
  // const receivedNickname = useState("");
  // const content = useState("");
  const [note, setNote] = useState({
    noteId: '',
    mebmerId: '',
    receivedNickname: '',
    content: ''
  });


const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({...note, [name]:value})    
};

const handleSend = (e) => {
  e.preventDefault();
  const formData = new FormData();
  console.log(note.noteId);
  formData.append("noteId", note.noteId);
  formData.append("receivedNickname", note.receivedNickname);
  formData.append("content", note.content);
  // formData.append("memberId", note.memberId);
  axios.post('http://localhost:8090/note/send', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })
  .then((response) => {
    console.log(response.data);
    document.location.href=`/note/received`;
  })
  .catch((error) => {
    console.log(formData.toString());
    console.log(error.data);
    console.error(error);
  });
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
                <input type="text" maxLength={20} name= "receivedNickname" onChange={change} placeholder='보내는 사람의 이메일을 입력해 주세요.' className='note-email'/>
                <button type='button' className='send-btn' onClick={handleSend}>보내기</button>
              </div>
              <div className='writing-area'>
                <textarea name="content" id="" cols="5" rows="55" title='쪽지 내용을 입력해 주세요.' 
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
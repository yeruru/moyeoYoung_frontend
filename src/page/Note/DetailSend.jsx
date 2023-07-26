import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Note.css';
import NoteMenu from './NoteMenu';

function DetailSent() {

  const Location = useLocation().pathname;
  const noteId = Location.split('/')[3];
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [note, setNote] = useState({
    content : '',
    senderNickname : '',
    receiverNickname : '',
    sendDate : '',
    status : ''
  });

  console.log(note)
  useEffect(() =>{
    //보낸쪽지함
    axios.get(`${process.env.REACT_APP_BURL}/note/received/detail/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then((res) => {
        setNote(res.data); 
      })
    .catch((err) => {
      console.log(err);
    });
    console.log(accessToken);
},[accessToken]);

const handleDeleteNote = () => {
  axios
    .delete(`${process.env.REACT_APP_BURL}/note/sent/delete/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(() => {
      alert('쪽지를 삭제하였습니다.');
      navigate("/sendnote");  
      })
    .catch((err) => {
      console.log(err);
      alert('쪽지 삭제에 실패하였습니다.');
    });
};

  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
        <div className='note-flex'>
          <div className='con'>
            <div className='con-btn'>
              <button onClick={handleDeleteNote}>삭제</button>
              <a href="/sendnote" className='note-list-a'>목록보기</a>
            </div>
            <div className='con-info'>
              <div style={{display:'flex'}}><h4>받는사람</h4><p>{note.receiverNickname}</p></div>
              <div style={{display:'flex', marginTop: '10px'}}><h4>보낸날짜</h4><p>{note.sendDate}</p></div>
            </div>
            <div className='con-text'>
            <p>{note.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailSent
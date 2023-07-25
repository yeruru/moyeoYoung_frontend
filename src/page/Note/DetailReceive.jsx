import React, { useEffect, useState} from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import './Note.css';
import NoteMenu from './NoteMenu';
import axios from 'axios';


function DetailReceive() {
  const Location = useLocation().pathname;
  const noteId = Location.split('/')[3];
  const [nickname , setNickname]= useState('');
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const [note, setNote] = useState({
    content : '',
    senderNickname : '',
    receiverNickname : '',
    sendDate : '',
    status : ''
  });

  useEffect(() =>{
    //받은쪽지함
    axios.get(`http://localhost:8090/note/received/detail/${noteId}`, {
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

  // TODO : 닉네임 넣어서 답장하기

const handleReply = () => {
  navigate(`/noteform/${note.senderNickname}`);
};

const handleDeleteNote = () => {
  axios
    .delete(`http://localhost:8090/note/received/delete/${noteId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((res) => {
      alert('쪽지를 삭제하였습니다.');
      navigate('/note'); // Note 컴포넌트로 이동
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
              <button type='button' onClick={handleReply}>답장하기</button>
              <a href="/note" className='note-list-a'>목록보기</a>
            </div>
            <div className='con-info'>
              <div style={{display:'flex'}}><h4>보낸사람</h4><p>{note.senderNickname}</p></div>
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

export default DetailReceive
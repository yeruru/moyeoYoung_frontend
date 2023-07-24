import React, { useEffect, useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import NoteMenu from './NoteMenu';
import axios from 'axios';

function Note() {
  const accessToken = localStorage.getItem('accessToken');
  const [noteId ,setNoteId] = useState(0);
  //  useLocation().pathname.split('/')[3];
  const [noteData, setNoteData] = useState([]);
  useEffect(() =>{
    //받은쪽지함
    axios.get('http://localhost:8090/note/received', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then((res) => {
        setNoteData(res.data.notes);
        console.log(res.data.notes.noteId);
        setNoteId(res.data.notes[0].noteId);
      })
    .catch((err) => {
      console.log(err);
    });
    console.log(accessToken);
},[accessToken]);

const noteStatus = (noteId) => {
  axios.post(`http://localhost:8090/note/${noteId}/read`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  })
  .then((res) => {
    axios.get('http://localhost:8090/note/received', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then((res) => {
      setNoteData(res.data.notes);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  })
  .catch((error) => {
    // 오류 처리
    console.error(error);
  });
};

  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
        <div className='note-flex'>
          <div>
            <h3 className='note-title'>받은쪽지함</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th scope='col' className='th-name'>보낸사람</th>
                    <th scope='col' className='th-content'>내용</th>
                    <th scope='col' className='th-date'>날짜</th>
                  </tr>
                </thead>
                <tbody>
                {noteData.map((note) => (
                    <Link to={`/note/receive/${note.noteId}`} key={note.noteId} onClick={()=> noteStatus(note.noteId)}>
                      <tr style={{ backgroundColor: note.status ? 'lightgrey' : 'white' }}>
                        <td className='td-name'><p>{note.senderNickname}</p></td>
                        <td className='td-content'><p>{note.content}</p></td>
                        <td className='td-date'><p>{note.sendDate}</p></td>
                      </tr>
                    </Link>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination count={10} shape="rounded" 
        style={{display: 'flex',
                justifyContent: 'center',
                marginTop: '30px'}}/>
      </div>
    </div>
  );
}

export default Note;


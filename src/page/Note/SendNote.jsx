import React, { useEffect, useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link } from 'react-router-dom';
import NoteMenu from './NoteMenu';
import axios from 'axios';

function SentNote() {
  const accessToken = localStorage.getItem('accessToken');
  
  const [noteData, setNoteData] = useState([]);
  useEffect(() =>{
    //보낸쪽지함
    axios.get('http://localhost:8090/note/sent', {
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
    console.log(accessToken);
},[accessToken]);

  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
        <div className='note-flex'>
          <div>
            <h3 className='note-title'>보낸쪽지함</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th scope='col' className='th-name'>받는사람</th>
                    <th scope='col' className='th-content'>내용</th>
                    <th scope='col' className='th-date'>날짜</th>
                  </tr>
                </thead>
                <tbody>
                {noteData.map((note) => (
                    <Link to={`/note/send/${note.noteId}`} key={note.noteId}>
                      <tr>
                        <td className='td-name'><p>{note.receiverNickname}</p></td>
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
  )
}

export default SentNote
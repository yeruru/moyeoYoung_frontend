import React, { useEffect, useState } from 'react';
import './Note.css';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import NoteMenu from './NoteMenu';
import axios from 'axios';

function Note() {
  const accessToken = localStorage.getItem('accessToken');
  const [noteId, setNoteId] = useState(0);
  const [noteData, setNoteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8;
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수 상태 추가

  useEffect(() =>{
    //받은쪽지함
    axios
      .get('http://localhost:8090/note/received', {
        params: {
          page: currentPage, // 현재 페이지 번호를 파라미터로 전달
          pageSize: pageSize,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNoteData(res.data.notes);
        setTotalPages(res.data.totalPages); // 총 페이지 수 설정
        setNoteId(res.data.notes[0].noteId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, currentPage]);

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

const handleChange = (event, value) => {
  setCurrentPage(value - 1); // 페이지 번호는 0부터 시작하므로, -1 처리
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
                  <tr key={note.noteId} style={{ backgroundColor: note.status ? '#f4f4f4' : 'white' }}>
                    <td className='td-name'><p>{note.senderNickname}</p></td>
                    <td className='td-content'>
                      <Link to={`/note/receive/${note.noteId}`} onClick={() => noteStatus(note.noteId)}>
                        <p>{note.content}</p>
                      </Link>
                    </td>
                    <td className='td-date'><p>{note.sendDate}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <Pagination 
          count={totalPages} // 총 페이지 수로 변경
          page={currentPage + 1} // 현재 페이지 번호
          onChange={handleChange} // 페이지 변경 시 호출되는 함수
          shape="rounded" 
          style={{display: 'flex',
                  justifyContent: 'center',
                  marginTop: '30px'}}
        />
      </div>
    </div>
  );
}

export default Note;

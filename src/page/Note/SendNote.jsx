import React from 'react'
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link } from 'react-router-dom';
import NoteMenu from './NoteMenu';

function SentNote() {
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
                    <th scope='col' className='th-name'>보낸사람</th>
                    <th scope='col' className='th-content'>내용</th>
                    <th scope='col' className='th-date'>날짜</th>
                  </tr>
                </thead>
                <tbody>
                    <Link to="/detailsend">
                      <tr>
                        <td className='td-name'><p>나현윤</p></td>
                        <td className='td-content'><p>ㅎㅇ</p></td>
                        <td className='td-date'><p>2023-07-03</p></td>
                      </tr>
                    </Link>
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
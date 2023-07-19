import React from 'react'
import './Note.css';
import NoteMenu from './NoteMenu';

function DetailSent() {
  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
        <div className='note-flex'>
          <div className='con'>
            <div className='con-btn'>
              <button>삭제</button>
              <a href="/sendnote" className='note-list-a'>목록보기</a>
            </div>
            <div className='con-info'>
              <div style={{display:'flex'}}><h4>받는사람</h4><p>이예림</p></div>
              <div style={{display:'flex', marginTop: '10px'}}><h4>보낸날짜</h4><p>23-07-19</p></div>
            </div>
            <div className='con-text'>
              <p>ㅎㅇdfssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailSent
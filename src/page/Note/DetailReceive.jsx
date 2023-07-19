import React from 'react'
import './Note.css';
import NoteMenu from './NoteMenu';

function DetailReceive() {
  return (
    <div className='wrap' style={{display:'flex', justifyContent: 'space-between', marginTop: '85px'}}>
      <NoteMenu/>
      <div className="note">
        <div className='note-flex'>
          <div className='con'>
            <div className='con-btn'>
              <button>삭제</button>
              <button>답장하기</button>
              <a href="/note" className='note-list-a'>목록보기</a>
            </div>
            <div className='con-info'>
              <div style={{display:'flex'}}><h4>보낸사람</h4><p>홍성빈</p></div>
              <div style={{display:'flex', marginTop: '10px'}}><h4>보낸날짜</h4><p>23-07-19</p></div>
            </div>
            <div className='con-text'>
              <p>안녕하세요~~~모임에 가입하고 싶어용~~dddddddddddddddddddddd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailReceive
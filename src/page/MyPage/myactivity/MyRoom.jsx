import React from 'react'
import MyActivityNav from './MyActivityNav';
import myIco from '../../../images/my/my-ico.png';
import MyPage from '../MyPage';

function MyRoom() {
  return (
    <div className='wrap'>
      <div className='mypage-title-box'>
        <img src={myIco} alt="아이콘" className='myIco' style={{width:'23px'}}/>
        <h3>나의활동</h3>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <MyActivityNav/>  
        <div style={{width:'100%', boxSizing:'border-box', padding:'20px'}}>
          없을때는 비행기 날라가면서 00이 없습니다 하는거 알지?
          성빈아 여기에 내모임방을 넣거라
        </div>
      </div>
    </div>
  )
}

export default MyRoom
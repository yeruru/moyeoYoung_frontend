import React from 'react'
import MyActivityNav from './MyActivityNav';
import styled from 'styled-components';
import myIco from '../../../images/my/my-ico.png';
import MyPage from '../MyPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RoomCard } from '../../../components/RoomCard/RoomCard';
import '../MyPage.css';
import { Link } from 'react-router-dom';
function MyJoinRoom() {
  
  const [roomList, setRoomList] = useState([]);
  const [isBookmarks, setIsBookmarks] = useState([]);
  const containRoomCnt = (roomList.length) % 3;
  const emptyRoomCnt = 3 - containRoomCnt;
  const [noRoomList,setNoRoomList] = useState(false); 
  const [isMemberList,setIsMemberList]= useState(true); 
  const [isWaitingList,setIsWaitingList]= useState(false); 
  const aceessToken = localStorage.getItem('accessToken');

  // const [waitingList,setWaitingList]=useState([]);
  useEffect(() => { 
    getMemberList(false);
  }, [])
  const getMemberList=(p_status)=>{
    axios.get(`${process.env.REACT_APP_BURL}/member/joinRoomList`, {
      headers: {
        'Authorization': `Bearer ${aceessToken}`
      },
    })
      .then((res) => {
        const {waitingList, enterList} = res.data.list;
        if(p_status){ //가입 대기중인 방목록
          setRoomList([...waitingList]);
          if(waitingList.length===0){
            setNoRoomList(true);
          }else{
            setNoRoomList(false);
          }
           
        }else{ 
          setRoomList([...enterList]);
          if(enterList.length===0){
            setNoRoomList(true);
          }else{
            setNoRoomList(false);
          }
        } 
        setIsBookmarks([...res.data.isBookmarks]);
        
      })
      .catch(err => {
      })
  }
  const clickMemberList =()=>{
    if(!isMemberList){
      setIsMemberList(true);
    }
    setIsWaitingList(false);
    getMemberList(false);
  }
 
  const clickWaitingList =()=>{
    if(!isWaitingList){
      setIsWaitingList(true);
    } 
    setIsMemberList(false);
    getMemberList(true); 
  }
  return (
    
    <div className="myRoom">
      <div className='wrap'>
        <div className='mypage-title-box'>
          <img src={myIco} alt="아이콘" className='myIco' style={{ width: '23px' }} />
          <h3>나의활동</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MyActivityNav />
          <div style={{ width: '100%', boxSizing: 'border-box', padding: '20px' }}>
        <button onClick ={clickMemberList} className={`h2 ${isMemberList?'select':''}`}>가입</button> 
        <button onClick ={clickWaitingList} className={`h2 ${isWaitingList?'select':''}`}>대기중</button>  
            <div className="list-box">
              <ul className='card-ul'>
              {noRoomList&&
                  <div className='empty-item-box'>
                    <div className='empty-img-box'>
                      <img src='/image/Group 153.svg' alt='비행기날라가는그림' /></div>
                    <p className='empty-p'>가입한 모임방이 존재하지 않습니다!</p>
                    <Link to='/roomlist/1'><div className='go-btn'>모임방 둘러보기</div></Link>
                  </div>
                }
                { !noRoomList&&
                  roomList.map((item, index) => {
                    const isBookmark = isBookmarks.some((roomId) => roomId === item.roomId);
                    return (
                      <li key={index}>
                        <RoomCard key={item.roomId} isBookmark={isBookmark} item={item} />
                      </li>
                    )
                  })}
                {containRoomCnt !== 0 && Array(emptyRoomCnt).fill().map((_, index) => (
                  <li className='hidden-li' key={index}></li>))
                } 
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyJoinRoom

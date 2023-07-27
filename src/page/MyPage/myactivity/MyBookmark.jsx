import React from 'react'
import MyActivityNav from './MyActivityNav';
import myIco from '../../../images/my/my-ico.png'; 
import { useEffect,useState } from 'react';
import axios from 'axios';
import { RoomCard} from '../../../components/RoomCard/RoomCard'; 
import '../MyPage.css';


function MyBookmark() {  
  const [roomList,setRoomList] = useState([]);
  const [isBookmarks, setIsBookmarks] = useState([]);
  const containRoomCnt = (roomList.length) % 3;
  const emptyRoomCnt = 3 - containRoomCnt;
  const [noRoomList,setNoRoomList] = useState(false); 
  useEffect(()=>{
    const aceessToken = localStorage.getItem('accessToken');
    axios.get(`${process.env.REACT_APP_BURL}/member/roomListWithBookmark`, {
      headers: {
        'Authorization': `Bearer ${aceessToken}`
      },
    })
      .then((res) => {
        setRoomList([...res.data.list]);
        setIsBookmarks([...res.data.isBookmarks]); 
        if(res.data.list.length===0){
          setNoRoomList(true);
        }
      })
      .catch(err => {
        console.log(err);
      })
  },[])
  return (
    <div className='myRoom'> 
    <div className='wrap'>
      <div className='mypage-title-box'>
        <img src={myIco} alt="아이콘" className='myIco' style={{width:'23px'}}/>
        <h3>나의활동</h3>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <MyActivityNav/>  
        <div style={{width:'100%', boxSizing:'border-box', padding:'20px'}}>
        <div className="list-box">
            <ul className='card-ul'>
            {!noRoomList&&
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
              {noRoomList &&
                <div className='empty-item-box'>
                  <div className='empty-img-box'>
                    <img src='/image/Group 153.svg' alt='비행기날라가는그림'/></div>
                  <p className='empty-p'>북마크가 존재하지 않습니다!</p>
                </div>
              }
              
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MyBookmark
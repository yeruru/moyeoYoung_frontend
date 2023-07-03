import React from 'react'
import './RoomList.css'
import { RoomCard } from '../../components/RoomCard/RoomCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function RoomList() {
  const [roomList, setRoomList] = useState([]);
  const [word, setWord] = useState('');
  const containRoomCnt = (roomList.length+1) % 4;
  const emptyRoomCnt = 4 - containRoomCnt;
 const instance = axios.create({
    baseURL: 'http://localhost:8090', // 기본 경로 설정
  });


  useEffect(() => {
    instance.get('/roomList')
      .then((res) => {
        setRoomList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
 
  }, [])
 
  const searchByCateName=(e)=>{
    const cateName = e.target.value; 
    instance.get("/roomListByCate",{
      params: {
        cateName: cateName
      }
    })
    .then((res) => {
      setRoomList(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
    const searchByWord=()=>{
      console.log(word);
      instance.get("/roomListByWord",{
        params:{
          word:word
        }
      })
      .then((res) => {
        setRoomList(res.data);
      })
      .catch(err => {
        console.log(err);
      })

  }


  return (
    <div id='room-list'>
      <div className='wrap'>
        <div className='search-box'>
          <img src='/image/Group 14.svg' className='center-img' />
          <div className='search-position'><input type='text' className='search-text' name='word' placeholder='모임을 검색해 보세요.' onChange={(e)=> setWord(e.target.value)}/>
            <button type='button' onClick={searchByWord}><span className="material-symbols-outlined search-icon">
              search
            </span></button></div>

          <div className='tag-box'>
            <div className='tags'>
              <button type="button" className='tag' value="취업준비" onClick={searchByCateName}># 취업준비</button>
              <button type="button" className='tag' value="스터디"  onClick={searchByCateName}># 스터디</button>
              <button type="button" className='tag' value="과외/면접"  onClick={searchByCateName}># 과외/면접</button>
              <button type="button" className='tag' value="친목"  onClick={searchByCateName}># 친목</button>
            </div>
            <div className='tags'>
              <button type="button" className='tag' value="프로젝트"  onClick={searchByCateName}># 프로젝트</button>
              <button type="button" className='tag' value="동아리"  onClick={searchByCateName}># 동아리</button>
              <button type="button" className='tag' value="자기개발"  onClick={searchByCateName}># 자기개발</button>
              <button type="button" className='tag' value="기타"  onClick={searchByCateName}># 기타</button>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className="head-box">
            <div className='list-head'>
              <p className='h1'>모여YOUNG 모임</p>
              <p className='p1'>새로운 모임에 참여해 보세요.</p>
            </div>
            <Link to="/makeRoom"><button type='button' className='make-btn'>만들기</button></Link>
          </div>

          <div className="list-box">
            <ul className='card-ul'>
              {roomList.length==0 && 
                <div className='empty-item-box'> 
                  <div className='empty-img-box'> 
                  <img src='image/Group 153.svg'/></div>
                  <p className='empty-p'>모임방이 존재하지 않습니다!</p>
                  </div>
              }
              {roomList.map((item, index) => {
                return (
                  <li key={index}>
                    <RoomCard key={item.roomId} title={item.roomTitle} memCnt={item.roomUserCnt} category={item.roomCategory} content={item.roomContent} imgName={item.roomImage} />
                  </li>
                )
              })}
              {emptyRoomCnt !== 0 && Array(emptyRoomCnt+1).fill().map((_, index) => (
                <li className='hidden-li' key={index}> <RoomCard/></li>))}  
                {/* <li key={index} className="hidden-lid">dfsfsdf</li>))}   */}
            </ul>
            
          </div>

        </div>
      </div>
    </div >
  )
}

export default RoomList;
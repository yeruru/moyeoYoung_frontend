import React from 'react'
import './MemberList.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

export const MemberList = ({memberList,hostId}) => { 
  
  const test1 = () => {
    const aceessToken = localStorage.getItem('accessToken');
    axios.get(`http://localhost:8090/member/madeRoomList`, {
      headers: {
        'Authorization': `Bearer ${aceessToken}`
      },
    })
      .then((res) => {
        console.log("만든방",res.data.list);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const test2 = () => {
    const aceessToken = localStorage.getItem('accessToken');
    axios.get(`http://localhost:8090/member/joinRoomList`, {
      headers: {
        'Authorization': `Bearer ${aceessToken}`
      },
    })
      .then((res) => {
        console.log("가입한 방",res.data.list);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const test3 = () => {
    const aceessToken = localStorage.getItem('accessToken');
    axios.get(`http://localhost:8090/member/roomListWithBookmark`, {
      headers: {
        'Authorization': `Bearer ${aceessToken}`
      },
    })
      .then((res) => {
        console.log("북마크",res.data.list);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div id='memberList'>
      <div className='wrap'>
        <p className="h2">멤버목록</p>
        <div className='test'>
          <button onClick={test1}>만든방</button>
          <button onClick={test2}>가입한방</button>
          <button onClick={test3}>북마크</button>
        </div>
        <div className='container'>
          {
            memberList.map((member, index) => (
              <div className='memberBox' key={index}>
                <div className="sec1">

                  <div className="imgbox">
                    <img src={`http://localhost:8090/room/view/${member.fileName}`} />
                  </div>

                  <div className='nickname'>{member.nickname}</div>

                  {/* <div className={`host-icon-box`}>` */} 
                  <div className={`host-icon-box ${hostId===member.memberId?'show':''}`}>
                    <div>
                      <KeyRoundedIcon className='icon' />
                    </div><span>방장</span>
                  </div>
                </div>

                <div className="sec2">
                  <div className='memberModal'>모달</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

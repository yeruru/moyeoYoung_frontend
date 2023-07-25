import React from 'react'
import './MemberList.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

export const MemberList = ({memberList,hostId}) => { 
   
  return (
    <div id='memberList'>
      <div className='wrap'>
        <p className="h2">멤버목록</p> 
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

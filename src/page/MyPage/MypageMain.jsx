import React, {useEffect, useState} from 'react'
import MyPage from './MyPage';
import myIco from '../../images/my/my-ico.png';
import myIcon1 from '../../images/my/my-icon-1.svg';
import myIcon2 from '../../images/my/my-icon-2.svg';
import myIcon3 from '../../images/my/my-icon-3.svg';
import myIcon4 from '../../images/my/my-icon-4.svg';
import "./MyPage.css";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function MypageMain() {
  const [memberId, setMemberId] = useState();
  const accessToken = localStorage.getItem("accessToken");
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BURL}/feed/getmemberId`,  {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    .then(res=>{
      setMemberId(res.data);
    })
    .catch(err=>{
    })
  },[accessToken])

  return (
    <div className='mypageMain'>
      <div className='mypage-title-box'>
        <img src={myIco} alt="아이콘" className='myIco' style={{width:'23px'}}/>
        <h3>마이페이지</h3>
      </div>
      <div className='mypage-background'>
        <div className='mypage-content'>
          <div><MyPage/></div>
          <div className='mypage-active'>
            <h4>나의 활동</h4>
            <div className='mypage-active-box'>
              <ul style={{width:'100%', display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
                <li style={{width:'50%'}}>
                  <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <a href={`/myroom/${memberId}`} className='my-icon-link'>
                      <img src={myIcon1} alt="내모임방 아이콘" style={{width:'50px'}}/>
                    </a>
                    <span className='mypage-icon-text'>내 모임방</span>
                  </div>
                </li>
                <li style={{width:'50%'}}>
                  <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <a href={`/myjoinroom/${memberId}`} className='my-icon-link'>
                      <img src={myIcon2} alt="내모임방 아이콘" style={{width:'50px'}}/>
                    </a>
                    <span className='mypage-icon-text'>내 참여방</span>
                  </div>
                </li>
                <li style={{width:'50%', marginTop:'40px'}}>
                  <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <a href={`/myfeed/${memberId}`} className='my-icon-link'>
                      <img src={myIcon3} alt="내모임방 아이콘" style={{width:'50px'}}/>
                    </a>
                    <span className='mypage-icon-text'>내 피드</span>
                  </div>
                </li>
                <li style={{width:'50%', marginTop:'40px'}}>
                  <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <a href={`/mybookmark/${memberId}`} className='my-icon-link'>
                      <img src={myIcon4} alt="내모임방 아이콘" style={{width:'50px'}}/>
                    </a>
                    <span className='mypage-icon-text'>모임 북마크</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MypageMain


import React from 'react'
import './MemberList.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Profile from '../../../../components/Profile/Profile';
// import { WaitingLIst } from './WaitingLIst'; 

export const MemberList = ({memberList,hostId,isWaitingOk}) => {  
  const accessToken = localStorage.getItem("accessToken");
  const [isWaitingList,setIsWaitingList] = useState(false);
  const [isMemberList,setIsMemberList] = useState(true);
  // const [isSelect,setIsSelect] = useState(false);
  // const [isView, setIsView] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileModal ,setProfileModal] = useState(false);
  const [kingMember, setKingMember] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const [loginMemberId, setLoginMemberId] = useState(0);
  let { roomId } = useParams();

  const [list,setList] = useState([...memberList]);
  const axiosURL = axios.create({
    baseURL: process.env.REACT_APP_BURL, // 기본 경로 설정
  });
  const [notWaiting,setNotWaiting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(isWaitingOk);
  
  useEffect(() => {
    axiosURL.get(`/feed/getmemberId`,{
      headers: {
          'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(res=>{
      setLoginMemberId(res.data);
    })

    if (memberList.length > 0) {
      setKingMember(memberList[0]);
    }
  }, [list, accessToken]);

  //멤버리스트 받아오기 
  const getMemberList =(p_status)=>{
    axiosURL.get(`/room/memberList/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }, 
    })
      .then(res=>{
        //대기멤버목록
        if(p_status){
          setList([...res.data.waitingList]); 
          if(res.data.waitingList.length===0){
            setNotWaiting(true);
            setIsWaiting(false);
          }else{
            setIsWaiting(true); 
          }
        }else{    //가입멤버목록
          setList([...res.data.list]); 
        } 
      })
      .catch(err=>{
        console.log(err);
      })
  }

  const openProfile = (feednickname) => {
    setNickname(feednickname);
    setProfileModal(!profileModal);
  }

  const ProfileCloseModal = () => {
    setProfileModal(!profileModal);
  }

  const OpenModal = (modalMemberId) => {
    setDeleteModal(!deleteModal);
    setMemberId(modalMemberId);
    document.getElementById("body").style.overflowY="hidden";
  };

  const close = () => {
    setDeleteModal(!deleteModal);
    document.getElementById("body").style.overflowY="scroll";
  };

  const notclose = (event) => {
    event.stopPropagation();
  }

  const deletefeed = () => {
    if (memberId) {
      axiosURL.post(`/room/deletemember/${memberId}/${roomId}`)
      .then(res=>{  
        document.location.href=`/roomMain/roomFeed/${roomId}`;
      })
      .catch(err=>{
        console.log(err);
      })
    } else {
      console.log("memberId is not set.");
    }
  };

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
  //가입승인 ,거절
  const approve =(p_memberId)=>{ 
    axiosURL.put(`/room/approveMember`, {
      roomId: roomId,
      memberId: p_memberId,
    })
    .then((res=>{
      alert(res.data);
      getMemberList(true);
    }))
    .catch(err=>{
      console.log(err);
    })
  }
  const reject =(p_memberId)=>{ 
    axiosURL.post(`/room/rejectMember`, {
      roomId: roomId,
      memberId: p_memberId,
    })
    .then((res=>{
      alert(res.data);
      getMemberList(true);
    }))
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div id='memberList'>
      <div className='wrap'>
        <div className='header-box'>  
        <button onClick ={clickMemberList} className={`h2 ${isMemberList?'select':''}`}>멤버 목록</button>
        {
          loginMemberId === kingMember.memberId && 
          <button onClick ={clickWaitingList} className={`h2 ${isWaitingList?'select':''}`}>가입대기<span className={`hide ${isWaiting? 'show':''}`}>new!</span></button> 
        }
        </div>
        <div className='container'>  
        {
           isWaitingList && notWaiting && 
          <div className='empty-item-box'>
          <div className='empty-img-box'>
            <img src='/image/Group 153.svg' style={{width : '200px', marginBottom:'40px'}}/></div>
          <p className='empty-p'>대기중인 멤버가 없습니다!</p>
        </div>
        }
          {  
            list.map((member, index) => (
              <div className='memberBox' key={index}>
                <div className="sec1">

                  <div className="imgbox" onClick={()=>openProfile(member.nickname)} style={{cursor:'pointer'}}>
                    <img src={process.env.REACT_APP_BURL+`/room/view/${member.fileName}`} alt='멤버프로필이미지'/>
                  </div>

                  <div className='nickname' onClick={()=>openProfile(member.nickname)} style={{cursor:'pointer'}}>{member.nickname}</div>

                  {/* <div className={`host-icon-box`}>` */} 
                  <div className={`host-icon-box ${hostId===member.memberId?'show':''}`}>
                    <div>
                      <KeyRoundedIcon className='icon' />
                    </div><span>방장</span>
                  </div>
                </div>
                {
                  // kingMember.memberId === member.memberId &&  
                  // <div></div>

                  isWaitingList &&

                  <div className='waiting-btn-box'> 
                  <div className='waiting-btn btn1' onClick={()=>{approve(member.memberId)}}>
                  수락
                  </div>
                  <div className='waiting-btn btn2' onClick={()=>{reject(member.memberId)}}>
                  거절
                  </div>
                  </div>
                }
                {
                  isMemberList && kingMember.memberId !== member.memberId && 
                  <>
                    <div className="sec2">
                      {
                        kingMember.memberId === loginMemberId && 
                        <div className='memberModal' onClick={()=>OpenModal(member.memberId)}>강퇴</div>
                      }
                      {
                         kingMember.memberId !== loginMemberId && 
                         <div></div>
                      }
                    </div>
                    <div className={`checkbackground ${deleteModal ? 'show2' : ''}`}  onClick={close}>
                        <div className='checkdelete' onClick={notclose}> 
                            <div className='checkword'>강퇴하시겠습니까?</div>
                            <div className='checkword2'>
                                <div className='checkoutdelete' onClick={close}>취소</div>
                                <div className='delete' onClick={deletefeed}>강퇴하기</div>
                            </div>
                        </div>
                    </div>
                  </>
                }
              </div>
            ))
          } 
        </div>
      </div>
      <Profile
          isOpen={profileModal}
          content={nickname}
          isClose={ProfileCloseModal}
        />
    </div>
    
  )
}

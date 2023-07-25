import React from 'react'
import './MemberList.css';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import Profile from '../../../../components/Profile/Profile';

export const MemberList = ({memberList,hostId}) => { 
  
  const [nickname, setNickname] = useState("");
  const [profileModal ,setProfileModal] = useState(false);
  const [kingMember, setKingMember] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const [loginMemberId, setLoginMemberId] = useState(0);
  let { roomId } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  const test1 = () => {
    axios.get(`http://localhost:8090/member/madeRoomList`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
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
    axios.get(`http://localhost:8090/member/joinRoomList`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
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
    axios.get(`http://localhost:8090/member/roomListWithBookmark`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    })
      .then((res) => {
        console.log("북마크",res.data.list);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:8090/feed/getmemberId`,{
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
  }, [memberList]);

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
      axios.post(`http://localhost:8090/room/deletemember/${memberId}/${roomId}`)
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

                  <div className="imgbox" onClick={()=>openProfile(member.nickname)} style={{cursor:'pointer'}}>
                    <img src={`http://localhost:8090/room/view/${member.fileName}`} />
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
                  kingMember.memberId == member.memberId &&  
                  <div></div>
                }
                {
                  kingMember.memberId != member.memberId && 
                  <>
                    <div className="sec2">
                      {
                        kingMember.memberId == loginMemberId &&
                        <div className='memberModal' onClick={()=>OpenModal(member.memberId)}>강퇴</div>
                      }
                      {
                         kingMember.memberId != loginMemberId && 
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

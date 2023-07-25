import React, { useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import "./RoomFeed.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import nothing from '../../../../images/Group 153.svg'
import axios from 'axios';
import RoomFeedDetail from './RoomFeedDetail';
import ModifyFeed from './ModifyFeed.jsx';
import Profile from '../../../../components/Profile/Profile';


function RoomFeed({onContentChange}) {
  const [likes, setLikes] = useState([]);
  const [modalClicked, setModalClicked] = useState(false);
  const [feed, setFeed] = useState([]);
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [feedId, setFeedId] = useState();
  const [mfeedId, setMFeedId] = useState();
  const [memberId, setMemberId] = useState();
  const [nickname, setNickname] = useState('');
  let { roomId } = useParams();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalClicked(false);
      } else {
        setModalClicked(true);
      }
    };
  
    if (modalRef.current) {
      window.addEventListener('click', handleClickOutsideModal);
    }
  
    return () => {
      window.removeEventListener('click', handleClickOutsideModal);
    };
  }, []);

  
  useEffect(()=>{
    axios.get(`http://localhost:8090/feed/likelist`,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }})
      .then(res=>{
        setLikes(res.data);
      })
      .catch(err=>{

      });

    axios.get(`http://localhost:8090/feed/selectfeed/${roomId}/`)
      .then(res=>{
        setFeed(res.data);
        console.log(res.data);
      })
      .catch(err => {

      })
      axios.get(`http://localhost:8090/feed/getmemberId`,{
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(res=>{
          setMemberId(res.data);
      })
  },[accessToken]);


  const update = () => {
    axios.get(`http://localhost:8090/feed/selectfeed/${roomId}/`)
    .then(res=>{
      setFeed(res.data);
    })
    .catch(err => {
    })
  }
  
  const modal = (p_feedId) => {
    setModalClicked(prevState => ({
      ...prevState,
      [p_feedId]: !prevState[p_feedId]
    }));
  };

  const handleClick = (feedId) => {
    setLikes((prevLikes) => {
      const isLiked = prevLikes.includes(feedId);
      if(isLiked){
        decreaseLikeCount(feedId);
        axios.get(`http://localhost:8090/feed/delike/${feedId}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
        return prevLikes.filter((id) => id !== feedId)
      }else{
        increaseLikeCount(feedId);
        axios.get(`http://localhost:8090/feed/like/${feedId}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
        .then(res=>{
          console.log(res);
        })
        .catch(err=>{
          console.log(err);
        })
        return [...prevLikes, feedId];
      }
    });
  };

  const increaseLikeCount = (feedId) => {
    setFeed((prevFeed) => {
      return prevFeed.map((feed) =>
        feed.feedId === feedId ? { ...feed, likeCount: feed.likeCount + 1 } : feed
      );
    });
  } 

  const decreaseLikeCount = (feedId) => {
    setFeed((prevFeed) => {
      return prevFeed.map((feed) =>
        feed.feedId === feedId ? { ...feed, likeCount: feed.likeCount - 1 } : feed
      );
    });
  }

  const location = (content) => {
    onContentChange(content);
  }

  const detail = (feedId) =>{
    setFeedId(feedId);
    setModalOpen(true);
    document.getElementById("body").style.overflowY="hidden";
  }

  const modify = (feedId) => {
    setFeedId(feedId);
    setModifyModal(true);
    document.getElementById("body").style.overflowY="hidden";
  }

  const handleCloseModal = () => {
    setFeedId(null);
    setModalOpen(false);
    update();
    document.getElementById("body").style.overflowY="scroll";
  };

  const ModifyCloseModal = () => {
    setFeedId(null);
    setModifyModal(false);
    document.getElementById("body").style.overflowY="scroll";
  }

  const open = (p_id) => {
    setDeleteModal(!deleteModal);
    setMFeedId(p_id);
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
    axios.post(`http://localhost:8090/feed/deletefeed/${mfeedId}`)
    .then(res => {
      console.log(res);
      document.location.href=`/roomMain/roomFeed/${roomId}`;
    })
    .catch(err => {
    })
  }

  const openProfile = (feednickname) => {
    setNickname(feednickname);
    setProfileModal(!profileModal);
  }

  const ProfileCloseModal = () => {
    setProfileModal(!profileModal);
  }

  return (
    <div className='roomfeed'>
      <div className='room-box'>
        <div className='writeFeed' style={{cursor:'pointer'}} onClick={() => location('writefeed')}>작성하기</div> 
        {
          feed.length == 0 &&
          <div className='empty-item-box'>
          <div className='empty-img-box'>
            <img src={nothing} style={{width : '200px', marginBottom:'40px'}}/></div>
          <p className='empty-p'>게시물 피드가 존재하지 않습니다</p>
        </div>
        }
        {
          feed.map((feed)=>{
            return(
              <div className='feed' key={feed.feedId}>      
                <div className='feedHeader'>
                  <div className='userheader'>
                    <div className='userProfile' onClick={()=>openProfile(feed.nickname)} style={{backgroundImage : `url(http://localhost:8090/room/view/${feed.profilename})`, cursor:'pointer'}}></div>
                    <span className='username'>{feed.nickname}</span>
                  </div>
                  <div className='drop-box'>
                    {
                      feed.memberId == memberId && 
                      <>
                      <MoreVertIcon onClick={() => modal(feed.feedId)} style={{cursor:'pointer'}} ref={modalRef} ></MoreVertIcon> 
                      <div className={`droppage ${modalClicked[feed.feedId] ? 'show' : ''}`} >  
                         <ul>
                             <li>
                               <div className='feedModefy' style={{cursor:'pointer'}} onClick={() => modify(feed.feedId)}>수정</div>
                             </li>
                             <li>
                               <div className='feedDelete' style={{color:'red', cursor:'pointer'}} onClick={()=>{open(feed.feedId)}}>삭제</div>
                             </li>
                           </ul>
                      </div>
                      </>
                    }
                    <div className={`checkbackground ${deleteModal ? 'show' : ''}`}  onClick={close}>
                    <div className='checkdelete' onClick={notclose}> 
                        <div className='checkword'>정말로 삭제하시겠습니까?</div>
                        <div className='checkword2'>
                            <div className='checkoutdelete' onClick={close}>취소</div>
                            <div className='delete' onClick={deletefeed}>삭제하기</div>
                        </div>
                    </div>
                   </div>
                  </div>
                </div>
                <div className='feedContent'>
                  {
                    feed.filename.split(",").length < 3 && 1 < feed.filename.split(",").length &&
                    <div className='feedimg'>
                      <div>
                        <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                      </div>
                      <div className='feedimg2'>
                        <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                        <div className='otherimg'  onClick={() => detail(`${feed.feedId}`)}  key={feed.feedId} style={{ cursor : 'pointer'}}><em className='num'>+ 더보기</em></div>
                      </div>
                  </div>
                  }
                  {
                    feed.filename.split(",").length > 3 && 
                    <div className='feedimg'>
                      <div>
                        <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                      </div>
                      <div className='feedimg2'>
                        <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                        <div className='otherimg' onClick={() => detail(`${feed.feedId}`)} key={feed.feedId}  style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[2]})`, cursor : 'pointer'}}><em className='num'>+{feed.filename.split(",").length-3}</em></div>
                      </div>
                  </div>
                  }
                  {
                    feed.filename.split(",").length == 3 && 
                    <div className='feedimg'>
                      <div>
                        <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                      </div>
                      <div className='feedimg2'>
                        <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                        <div className='otherimg' onClick={() => detail(`${feed.feedId}`)} key={feed.feedId}  style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[2]})`, cursor : 'pointer'}}><em className='num'>+ 더보기</em></div>
                      </div>
                  </div>
                  }
                  {
                    feed.filename.split(",").length  == 1 && 
                    <div className='feedimg'>
                    <div>
                      <div className='bigimg' onClick={() => detail(`${feed.feedId}`)} style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`, cursor : 'pointer',
                        height: 'auto',
                        minHeight: '250px',
                        width:'500px',
                        margin: '0 auto',
                        backgroundSize: 'cover'}}>
                      </div>
                    </div>
                    </div>
                  }
                </div>
                <div className='feedfooter'>
                  <div className={`redlike ${likes.includes(feed.feedId) ? 'show' : ''}`} onClick={() => handleClick(feed.feedId)} style={{ position: 'relative', cursor: 'pointer' }}>
                    <FavoriteIcon style={{color: 'red', position:'relative',  fontSize:'25px'}} ></FavoriteIcon>
                  </div>
                  <div className={`like ${likes.includes(feed.feedId) ? '' : 'show'}`} onClick={()=>handleClick(feed.feedId)} style={{ position: 'relative', cursor: 'pointer' }}>
                    <FavoriteBorderIcon style={{color:'gray', position:'relative', fontSize:'25px'}}/>
                  </div>
                  <div id = {`likecount${feed.feedId}`} style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '2px'}}>{feed.likeCount}</div>
                    <ModeCommentOutlinedIcon onClick={() => detail(`${feed.feedId}`)} style={{color:'gray', fontSize : '23px', marginLeft : '9px',cursor : 'pointer' }}/> 
                    <div onClick={() => detail(`${feed.feedId}`)} style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '3px',cursor : 'pointer'}}>{feed.commentCount}</div>
                </div>
                <div className='Title'>{feed.title}</div>
                <div className='Content'>{feed.content}</div>
              </div>
            )
          })
        }
        <RoomFeedDetail
          isOpen={modalOpen}
          content={feedId}
          onClose={handleCloseModal}
          accessToken = {accessToken}
        />
        <ModifyFeed 
          isOpen={modifyModal}
          content={feedId}
          onClose={ModifyCloseModal}
          roomId = {roomId}
          accessToken={accessToken}
        />
        <Profile
          isOpen={profileModal}
          content={nickname}
          isClose={ProfileCloseModal}
        />
      </div>
    </div>
  )
}

export default RoomFeed;
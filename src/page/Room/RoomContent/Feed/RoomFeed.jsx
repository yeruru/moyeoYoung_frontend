import React, { useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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


function RoomFeed({onContentChange}) {
  const [isClicked, setIsClicked] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);
  const [member, setmember] = useState("승현");
  const [feed, setFeed] = useState([]);
  const modalRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedId, setFeedId] = useState();
  let { roomId } = useParams();

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
    axios.get(`http://localhost:8090/feed/selectfeed/${roomId}`)
    .then(res=>{
      setFeed(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  },[]);

  const modal = (feedId) => {
    setModalClicked(prevState => ({
      ...prevState,
      [feedId]: !prevState[feedId]
    }));
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    if(isClicked === false){
      increaseLikeCount();
    }else{
      decreaseLikeCount();
    }
  };

  // const MyComponent = () => {
  //   if(member == '승현'){
  //     return <div>This is rendered when condition is true.</div>;
  //   }else{
  //     return <div>This is rendered when condition is false.</div>;  
  //   }
  // }

  const increaseLikeCount = () => {
    let Count = document.getElementById("likecount").innerHTML;
    Count = (Number)(Count) + 1;
    document.getElementById("likecount").innerHTML = Count;
  }

  const decreaseLikeCount = () => {
    let Count = document.getElementById("likecount").innerHTML;
    Count = Count - 1;
    document.getElementById("likecount").innerHTML = Count;
  }

  const location = (content) => {
    onContentChange(content);
  }

  const detail = (feedId) =>{
    setFeedId(feedId);
    setModalOpen(true);
    document.getElementById("body").style.overflowY="hidden";
  }

  const handleCloseModal = () => {
    setFeedId(null);
    setModalOpen(false);
    document.getElementById("body").style.overflowY="scroll";
  };

  return (
    <div className='roomfeed'>
      <div className='room-box'>
        <div className='writeFeed' style={{cursor:'pointer'}} onClick={() => location('writefeed')} >작성하기</div> 
        {
          feed.length == 0 &&
          <div className='empty-item-box'>
          <div className='empty-img-box'>
            <img src={nothing} /></div>
          <p className='empty-p'>게시물 피드가 존재하지 않습니다</p>
        </div>
        }
        {
          feed.map((feed)=>{
            console.log(feed.feedId);
            return(
              <div className='feed' key={feed.feedId}>      
                <div className='feedHeader'>
                  <div className='userheader'>
                    <div className='userProfile'></div>
                    <span className='username'>일단 이름은 이걸로</span>
                  </div>
                  <div className='drop-box'>
                    <MoreVertIcon onClick={()=>modal(feed.feedId)} style={{cursor:'pointer'}} ref={modalRef} ></MoreVertIcon> 
                    <div className={`droppage ${modalClicked[feed.feedId] ? 'show' : ''}`} >  
                        <ul>
                            <li>
                              <div className='feedModefy' style={{cursor:'pointer'}}>수정</div>
                            </li>
                            <li>
                              <div className='feedDelete' style={{color:'red', cursor:'pointer'}}>삭제</div>
                            </li>
                          </ul>
                    </div>
                  </div>
                </div>
                <div className='feedContent'>
                <div className='Title'>{feed.title}</div>
                  {
                    feed.filename.split(",").length <= 3 && 1 < feed.filename.split(",").length &&
                    <div className='feedimg'>
                      <div>
                        <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                      </div>
                      <div className='feedimg2'>
                        <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                        <div className='otherimg'  onClick={() => detail(`${feed.feedId}`)}  key={feed.feedId} style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[2]})` , cursor : 'pointer'}}><em className='num'>+ 더보기</em></div>
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
                    feed.filename.split(",").length  == 1 && 
                    <div className='feedimg'>
                    <div>
                      <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`, 
                        maxWidth: '500px',
                        height: 'auto',
                        maxHeight: '300px',
                        minHeight: '250px',
                        margin: '0 auto',
                        backgroundSize: 'contain'}}>
                      </div>
                    </div>
                    </div>
                  }
                </div>
                <div className='feedfooter'>
                  <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
                    <FavoriteIcon style={{color: 'red', position:'relative' ,display : isClicked? 'block' : 'none' , fontSize:'25px'}} ></FavoriteIcon>
                  </div>
                  <div onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
                    <FavoriteBorderIcon style={{color:'gray', position:'relative',display : !isClicked? 'block' : 'none', fontSize:'25px'}}/>
                  </div>
                  <div id = "likecount" style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '2px'}}>12</div>
                    <ModeCommentOutlinedIcon onClick={() => detail(`${feed.feedId}`)} style={{color:'gray', fontSize : '23px', marginLeft : '9px' ,marginTop : '2px',cursor : 'pointer' }}/> 
                    <div onClick={() => detail(`${feed.feedId}`)} style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '3px',cursor : 'pointer'}}>31</div>
                </div>
                <div className='Content'>{feed.content}</div>
              </div>
            )
          })
        }
        <RoomFeedDetail
          isOpen={modalOpen}
          content={feedId}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  )
}

export default RoomFeed;
import React, { useState, useEffect, useRef} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./RoomFeed.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import nothing from '../../../../images/Group 153.svg'
import RoomMain from '../../RoomMain';
import axios from 'axios';


function RoomFeed({onContentChange}) {
  const [isClicked, setIsClicked] = useState(false);
  const [modalClicked, setModalClicked] = useState(false);
  const [member, setmember] = useState("승현");
  const [feed, setFeed] = useState([]);
  const modalRef = useRef(null);
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
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  },[]);

  const modal = () => {
    setModalClicked(!modalClicked);
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
            
            console.log(feed.filename.split(",")[0]);
            return(
              <div className='feed' key={feed.feedId}>      
                <div className='feedHeader'>
                  <div className='userheader'>
                    <div className='userProfile'></div>
                    <span className='username'>일단 이름은 이걸로</span>
                  </div>
                  <div className='drop-box'>
                    <MoreVertIcon onClick={modal} style={{cursor:'pointer'}} ref={modalRef} ></MoreVertIcon> 
                    <div className={`droppage ${modalClicked ? 'show' : ''}`} >  
                        <ul>
                            <li>
                              <a href="#">수정</a>
                            </li>
                            <li>
                              <a href="#" style={{color:'red'}}>삭제</a>
                            </li>
                          </ul>
                    </div>
                  </div>
                </div>
                <div className='feedContent'>
                <div className='Title'>{feed.title}</div>
                  {
                    feed.filename.split(",").length == 2 && 
                    <div className='feedimg'>
                    <div>
                      <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                    </div>
                    <div className='feedimg2'>
                      <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                      <div className='otherimg' ><em className='num'></em></div>
                    </div>
                  </div>
                  }
                  {
                    feed.filename.split(",").length >= 3 && 
                    <div className='feedimg'>
                    <div>
                      <div className='bigimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[0]})`}}></div>
                    </div>
                    <div className='feedimg2'>
                      <div className='smallimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[1]})`}}></div>
                      <div className='otherimg' style={{backgroundImage: `url(http://localhost:8090/room/view/${feed.filename.split(",")[2]})`}}><em className='num'>+{feed.filename.split(",").length-3}</em></div>
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
                    <ModeCommentOutlinedIcon style={{color:'gray', fontSize : '23px', marginLeft : '9px' ,marginTop : '2px',cursor : 'pointer' }}/> 
                    <div style={{color:'gray', fontSize:'15px', lineHeight:'24px' ,marginLeft : '3px'}}>31</div>
                </div>
                <div className='Content'>{feed.content}</div>
              </div>
            )
          })
        }
        <div>
          <div className='detailfeed'>
              <div className='feedDetail'>
                <div className='photo'>
                <Swiper 
                    style={{marginTop: '80px',width:'650px', height:'400px', overflow:'hidden', borderRadius: '10px', backgroundColor : 'black'}}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    pagination={{ clickable: true }}
                >
                    <SwiperSlide>
                        <div className='feeddetailImg' style={{backgroundImage : `url()`}}></div>
                    </SwiperSlide>
                </Swiper>

                </div>
                <div className='comment'>
                  <div className='commentDetail'>
                    
                  </div>
                  <div className='commentInput'>
                      <input className="writecomment" type='text' placeholder='댓글을 작성해주세요'/>
                      <input className="commentsubmit" type='submit'></input>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomFeed;
import React ,{useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import MyActivityNav from './MyActivityNav';
import myIco from '../../../images/my/my-ico.png';
import './MyFeed.css';
import MyPage from '../MyPage';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

function MyFeed() {
  const memberId = useLocation().pathname.split("/")[2];
  const [feed, setFeed] = useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BURL}/feed/selectfeeds/${memberId}`)
    .then(res=>{
      setFeed(res.data);
    })
    .catch(err=>{
    })
},[memberId])

  return (
    <div className='wrap' id='myfeed'>
      <div className='mypage-title-box'>
        <img src={myIco} alt="아이콘" className='myIco' style={{width:'23px'}}/>
        <h3>나의활동</h3>
      </div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <MyActivityNav/>  
        <div style={{width:'100%', boxSizing:'border-box', padding:'20px'}}>
                  <Swiper 
                        style={{width: '900px', overflow:'hidden', borderRadius: '10px' , position:'relative'}}
                        spaceBetween={0}
                        slidesPerView={3}
                        loop={false}
                        navigation={true}
                    >
                    {feed.length !== 0 &&
                        feed.map((item) => (
                            <SwiperSlide >
                                 <div className='myfeed' key={item.feedId}>
                                    <div className='feedImage'>
                                      <img src={`${process.env.REACT_APP_BURL}/room/view/${item.filename.split(",")[0]}`}></img>
                                    </div>
                                    <div className='feedcontent'> 
                                      <div className='feedtitle'>{item.title}</div>
                                      <div className='feedContent'>{item.content}</div>
                                      <div className='feedcomment'>
                                        <div className='feedLike'>
                                          <FavoriteIcon style={{color: 'red', position:'relative',  fontSize:'25px'}} ></FavoriteIcon>
                                        </div>
                                        <div className='likecount'>
                                          {item.likeCount}
                                        </div>
                                        <div className='feedcomments'>
                                          <ModeCommentOutlinedIcon style={{color:'gray', fontSize : '23px', marginLeft : '9px'}}/> 
                                        </div>
                                        <div className='commentcount'> 
                                          {item.commentCount}
                                        </div>
                                        <div className='room'>
                                          <a href={process.env.REACT_APP_FURL+`/roomMain/roomFeed/${item.roomId}`}>방으로 이동{' >'}</a>
                                        </div>
                                      </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    </Swiper>
                    {
                      feed.length === 0 && 
                      <ul className='card-ul'>
                        <div className='empty-item-box'>
                          <div className='empty-img-box'>
                            <img src='/image/Group 153.svg' alt='비행기날라가는그림'/></div>
                            <p className='empty-p'>피드가 존재하지 않습니다!</p>
                        </div>
                      </ul>
                    }
        </div>
      </div>
    </div>
  )
}

export default MyFeed
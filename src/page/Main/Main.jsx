import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import './Main.css';
import banner1 from '../../images/main/banner1.svg';
import banner2 from '../../images/main/banner2.svg';
import banner3 from '../../images/main/banner3.svg';
import youthLogo from '../../images/main/youthLogo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import nothing from '../../images/Group 153.svg';
import { RoomCard } from '../../components/RoomCard/RoomCard';

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Main() {
  const [roomList, setRoomList] = useState([]);
  const swiperRef = useRef(null);
  const [accessToken,setAccessToken] = useState();

  useEffect(() => {
    getRoomList();
    setAccessToken(localStorage.getItem('accessToken'));
    
  }, []);

  const getRoomList = () => {
    axios
      .get('http://localhost:8090/room/roomList/1',{
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        setRoomList(res.data.list);
      })
      .catch((err) => {
      });
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };


  return (
    <>
      <div className='main'>
        <Swiper
          style={{ marginTop: '80px' }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide style={{ backgroundColor: '#e1fde3' }}>
            <div className='slid'>
              <div className='banner-wrap'>
                <a href="#;" className='atag'>
                  <div>
                    <em style={{ backgroundColor: '#000' }}>청년TALK</em>
                    <h2>
                      청년공간에 혼자가고 싶지 않다면?<br />
                      청년들아 모여라 ~
                    </h2>
                    <p>청년공간에 같이갈 친구들을 모아 보세요~!</p>
                  </div>
                  <div>
                    <img src={banner1} alt='베너1' />
                  </div>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ backgroundColor: '#000' }}>
            <div className='slide'>
              <div className='banner-wrap'>
                <a href="#;" style={{ color: '#fff' }} className='atag'>
                  <div>
                    <em style={{ backgroundColor: 'var(--mo)' }}>고민은 이제 그만!</em>
                    <h2>
                      누구나 만들 수 있는 모임<br />
                      여기 다 모였다!
                    </h2>
                    <p>어떻게 모임을 만들어야 할지 모르는<br />당신을 위한 모여YOUNG</p>
                  </div>
                  <div>
                    <img src={banner2} alt='베너2' style={{ width: '370px', paddingRight: '90px' }} />
                  </div>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ backgroundColor: '#fbfbf3' }}>
            <div className='slide'>
              <div className='banner-wrap'>
                <a href="#;" className='atag'>
                  <div>
                    <em style={{ backgroundColor: '#ff8261', color: '#fff' }}>청년공간이란?</em>
                    <h2>
                      눈치보이는 카페공부<br />
                      이제는 청년공간에서!
                    </h2>
                    <p>청년공간에서 편하게 공부하세요!</p>
                  </div>
                  <div>
                    <img src={banner3} alt='베너3' style={{ width: '250px', paddingRight: '130px' }} />
                  </div>
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className='content wrap'>
          <div className='box'>
            <em>청년공간</em>
            <div className='title'>
              <h4>가까운 청년공간을 알아보세요🔍</h4>
              <Link to='/youthspacelist'>더보기 &gt;</Link>
            </div>
          </div>
          <div className='box youth'>
            <div>
              <em>청년TALK</em>
              <h4>청년공간에 같이 갈 친구가<br />필요하다면?</h4>
              <p>모임에 참여하기 부담스럽다면<br />청년톡에서 대화를 나누어 보세요 </p>
              <a href="#" className='youth-btn'>청년톡 참여하기</a>
            </div>
            <div>
              <a href="#">
                <img src={youthLogo} alt='청년TALK 청년TALK에 참여하여 다양한 이야기를 나눠보세요!' />
              </a>
            </div>
          </div>
          <div className='box'>
            <em>모임소식</em>
            <div className='title'>
              <h4>원하는 모임에 참여해 보세요🙋‍♀️</h4>
              <Link to='/roomlist/1'>더보기 &gt;</Link>
            </div>
            <div id='room-list'>
              <div className='content' style={{ width: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="swiper-button-prev" onClick={handlePrev}></span>
                  <span className="swiper-button-next" onClick={handleNext}></span>
                </div>
                <Swiper
                  ref={swiperRef}
                  style={{ width: '1100px' }}
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    '@0.00': {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    '@0.75': {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    '@1.00': {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    '@1.50': {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <div>
                    <ul className='card-ul'>
                      {roomList.length === 0 ? (
                        <div className='empty-item-box'>
                          <div className='empty-img-box'>
                            <img src={nothing} alt='No rooms' />
                          </div>
                          <p className='empty-p'>모임방이 존재하지 않습니다!</p>
                        </div>
                      ) : (
                        roomList.map((item, index) => (
                          <SwiperSlide key={index}>
                            <li>
                              <RoomCard item={item} />
                            </li>
                          </SwiperSlide>
                        ))
                      )}
                    </ul>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

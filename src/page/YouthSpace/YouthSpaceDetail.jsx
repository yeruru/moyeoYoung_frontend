import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './YouthSpaceDetail.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export const YouthSpaceDetail = () => {
  return (
    <div id="space-detail">
      <div className="wrap">
        <div className='detail-head'>
          <p>청년공간 &nbsp;&gt;&nbsp; <Link to="/youthspacelist/1" className='to-list'>청년공간 모아보기</Link> &nbsp;&gt;&nbsp; 호서대벤처타워 </p>
        </div>
        <div className='space-title'>호서대벤처타워</div>
        <div className="img-box">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="swiper-container"
          >
            <SwiperSlide>
              <img src="/image/room_basic1.jpg" alt="Image 1" className='img'/>
            </SwiperSlide>
            <SwiperSlide>
            <img src="/image/room_basic2.jpg" alt="Image 1" className='img' />
            </SwiperSlide>
            <SwiperSlide>
            <img src="/image/room_basic3.jpg" alt="Image 1" className='img'/>
            </SwiperSlide>
          </Swiper>

        </div>
      </div>
      <div className='container'>
        <div className="summary-con con">
          <div className="p-box">
            <p className='p-h2'>기본정보</p>
          </div>
          <ul className="s-textbox">
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>공간유형</span> :&nbsp;&nbsp;&nbsp;순수공간 </li>
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>장소</span> :&nbsp;&nbsp;&nbsp;서울 금천구 가산디지털단지 1로 어쩌구저쩌구</li>
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>운영시간</span> :&nbsp;&nbsp;&nbsp;월~금 10:00~18:00</li>
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>업무시간</span> :&nbsp;&nbsp;&nbsp;월~금 10:00~20:00 </li>
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>운영기관</span> :&nbsp;&nbsp;&nbsp;kosta</li>
            <li className='s-p'>-&nbsp;&nbsp; <span className='t1'>홈페이지</span> :&nbsp;&nbsp;&nbsp;http://localhost:8090/test</li>

          </ul>
        </div>


        <div className="detail-con con">
          <div className="p-box">
            <p className='p-h2'>상세정보</p>
          </div>
          <div className='s-textbox'>
            <p className='detail-area'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br /> Voluptate architecto corporis vel nostrum, nulla in aut laudantium temporibus voluptates quos fugit amet ullam alias vitae veritatis dicta? Ab, ipsum quia.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate architecto corporis vel nostrum, nulla in aut laudantium temporibus voluptates quos fugit <br />amet ullam alias vitae veritatis dicta? Ab, ipsum quia.
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br /> Voluptate architecto corporis vel nostrum, nulla in aut laudantium temporibus voluptates quos fugit amet ullam alias vitae veritatis dicta? Ab, ipsum quia.<br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.<br /> Voluptate architecto corporis vel nostrum, nulla in aut laudantium temporibus voluptates quos fugit amet ullam alias vitae veritatis dicta? Ab, ipsum quia.
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

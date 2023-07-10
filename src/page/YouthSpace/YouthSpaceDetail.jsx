import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import './YouthSpaceDetail.css'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios'; 

export const YouthSpaceDetail = () => { 
  const { spaceId } = useParams();
  const [space, setSpace] = useState({});
  const [ detail, setDetail] = useState('');
  const [imgURLs , setImgURLs] = useState([]);

  useEffect(()=>{
    console.log(spaceId);
    axios.get(`http://localhost:8090/youth/youthSpaceDetail/${spaceId}`)
    .then(res=>{
      setSpace(res.data.space);  
      setDetail(res.data.space.detail.replace(/<br\/>/g, '\n').replace(/\다. /g, '다.\n').replace(/○/g, '\n○').replace(/\n○/, '○'));
      // console.log(res.data.space.detail.replace(/<br\/>|\. /g, '\n'));
      // console.log(res.data.space.imgURLs);
      setImgURLs(res.data.space.imgURLs);
    })
    .catch(err=>{
      console.log(err);
    })
  },[spaceId])
  // const toText = (p_txt) =>{

  //   formatted_text = re.sub(r'\.\s+', '.\n', text)
  // }
  return (
    <div id="space-detail">
      <div className="wrap">
        <div className='detail-head'>
          <p>청년공간 &nbsp;&gt;&nbsp; <Link to="/youthspacelist/1" className='to-list'>청년공간 모아보기</Link> &nbsp;&gt;&nbsp; {space.title} </p>
        </div>
        <div className='space-title'>{space.title}</div>
        <div className="img-box">
          <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="swiper-container"
            >
            {/* <img src="" alt="공간이미지들" className='img'/> */}
              { 
              imgURLs.map((item, index)=>(
            <SwiperSlide key={index}> 
                <img  src={item} alt="공간이미지들" className='img'/>
            </SwiperSlide>
              ))
              }
             
           
          </Swiper>

        </div>
      </div>
      <div className='container'>
        <div className="summary-con con">
          <div className="p-box">
            <p className='p-h2'>기본정보</p>
          </div>
          <ul className="s-textbox">
            <li className='s-p'>-&nbsp;&nbsp; 
            <div className='t1'>공간유형</div> :&nbsp;&nbsp;&nbsp;{space.spaceType} 
            </li>
            <li className='s-p'>-&nbsp;&nbsp; <div className='t1'>장소</div> <span>:&nbsp;&nbsp;&nbsp;{space.place}</span></li>
            <li className='s-p'>-&nbsp;&nbsp; <div className='t1'>운영시간</div> :&nbsp;&nbsp;&nbsp;{space.useTime} </li>
            <li className='s-p'>-&nbsp;&nbsp; <div className='t1'>업무시간</div> :&nbsp;&nbsp;&nbsp;{space.openHours} </li>
            <li className='s-p'>-&nbsp;&nbsp; <div className='t1'>운영기관</div> :&nbsp;&nbsp;&nbsp;{space.inst}</li>
            <li className='s-p'>-&nbsp;&nbsp; <div className='t1'>홈페이지</div> :&nbsp;&nbsp;&nbsp;<a href = {space.homepage} className='homepage'>{space.homepage}</a></li>

          </ul>
        </div>


        <div className="detail-con con">
          <div className="p-box">
            <p className='p-h2'>상세정보</p>
          </div>
          <div className='s-textbox'>
            <p className='detail-area'>
              {detail}
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

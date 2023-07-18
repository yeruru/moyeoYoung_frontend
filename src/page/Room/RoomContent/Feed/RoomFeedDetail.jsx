import "./RoomFeed.css";
import React, { useState ,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';

const RoomFeedDetail = ({isOpen, onClose, content, accessToken}) => { 
    const [feedDetail, setFeedDetail] = useState({title:'', content:'' ,userId : 0,  filename : '', roomcreateDate : ''});
    const [feedFileName, setFeedFileName] = useState([])
    const [comment, setComment] = useState();

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const commentChange = (e) => {
        const comment = e.target.value;
        setComment(comment);
    }

    useEffect(() => {
        axios.get(`http://localhost:8090/feed/detailfeed/${content}`)
        .then(res=>{
            setFeedDetail(prevFeedDetail => ({
                ...prevFeedDetail,
                title : res.data.title,
                content : res.data.content,
                filename : res.data.filename,
                roomcreateDate : res.data.roomCreateDate
              }));
        })
        .catch(err=>{
        });
    },[content]);   

    // useEffect(()=>{
    //     axios.get(`http://localhost:8090/feed/selectcomment/${content}`,{
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`
    //         }   
    //     })
    //     .then(res=>{

    //     })
    // })

    const commentSubmit = (e) => {
        const formData = new FormData();
        formData.append("comment", comment);
        axios.post(`http://localhost:8090/feed/writecomment/${content}`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }   
        })
        .then(res=>{
            console.log(content);
        })
        .catch(err=>{

        })
    };



    return(
        <div className="roomfeeddetail">
            <div className={`detailfeed ${isOpen ? 'show' : ''}`} onClick={onClose}>
                <div className='feedDetail' onClick={handleModalClick}>
                <div className='photo'>
                    <Swiper 
                        style={{marginTop: '60px', minWidth:'650px', minHeight:'400px', overflow:'hidden', borderRadius: '10px' , position:'relative'}}
                        spaceBetween={30}
                        slidesPerView={1}
                        loop={false}
                        navigation={true}
                    >
                    {
                        feedDetail.filename.split(",").map((item) => (
                            <SwiperSlide key={item}>
                                <div className='feeddetailImg' style={{backgroundImage:`url(http://localhost:8090/room/view/${item})`}}></div>
                            </SwiperSlide>
                        ))

                    }
                    </Swiper>
                    <div className='detailTitle'>{feedDetail.title}</div>
                    <div className='detailContent'>{feedDetail.content}</div>

                </div>
                <div className='comment'>
                    <div className='commentDetail'> 
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'> </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    <div className='comments'>
                        <div className='profileimg'></div>
                        <div className='commentbox'>
                        <div className='username'>SH_06504<span className='timer'>시간</span></div>
                        <div className='realcomment'>반갑습니다  반갑습니다  반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 반갑습니다 </div>
                        </div>
                    </div>
                    </div>
                    <div className='commentInput'>
                        <input className="writecomment" type='text' placeholder='댓글을 작성해주세요' onChange={commentChange}/>
                        <input className="commentsubmit" type='submit' onClick={commentSubmit}></input>
                    </div>
                </div>
                </div>
            </div>
      </div>
    )
}

export default RoomFeedDetail;
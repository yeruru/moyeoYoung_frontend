import "./RoomFeed.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState ,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import Timer from "./Timer";

const RoomFeedDetail = ({isOpen, onClose, content, accessToken}) => { 
    const [feedDetail, setFeedDetail] = useState({title:'', content:'' ,userId : 0,  filename : '', roomcreateDate : ''});
    const [feedFileName, setFeedFileName] = useState([])
    const [comment, setComment] = useState([]);
    const [commentword, setcommentword] = useState();
    const [modal, setModal] = useState(false);
    const [commentId, setCommentId] = useState();
    const [memberId, setMemberId] = useState();

    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    const commentChange = (e) => {
        const comment = e.target.value;
        setcommentword(comment);
    };

    useEffect(()=>{
        axios.get(`http://localhost:8090/feed/getmemberId`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res=>{
            setMemberId(res.data);
        })
    },[]);


    useEffect(()=>{
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

        axios.get(`http://localhost:8090/feed/selectcomment/${content}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }   
        })
        .then(res=>{
            setComment(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            
        });
    },[content]);

    const fetchComment = () => {
            axios.get(`http://localhost:8090/feed/selectcomment/${content}`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }   
            })
            .then(res=>{
                setComment(res.data);
                setTimeout(() => {
                    const list = document.getElementById('commentDetail');
                    list.scrollTop = list.scrollHeight;
                }, 300);
            })

        };

    const commentSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("comment", commentword);
        axios.post(`http://localhost:8090/feed/writecomment/${content}`, formData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }   
        })
        .then(res=>{
            fetchComment();
        })
        .catch(err=>{
        })
    };

    const ModalOpen = (commentId) => {
        setModal(!modal);
        setCommentId(commentId)
    };

    const ModalClose = () => {
        setModal(!modal);
    };

    const notClose =(event) => {
        event.stopPropagation();
    }

    const deletecomment = () => {
        axios.post(`http://localhost:8090/feed/deletecomment/${commentId}`)
        .then(res => {
            setModal(!modal);
            fetchComment();
        })
        .catch(err => {
            
        })
    };
   
// console.log(comment[0].memberId);
// console.log(memberId);


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
                    <div className='commentDetail' id="commentDetail"> 
                    {
                        comment.map((item)=>(
                            <div className='comments' key={item.commentId}>
                                <div className='profileimg' style={{backgroundImage:`url(http://localhost:8090/room/view/${item.profilename})`}}></div>
                                <div className='commentbox'>
                                    
                                        <div className='username' >
                                            <span>{item.nickname}</span>
                                            <Timer commentCreateDate={item.commentCreateDate} />
                                            {
                                                item.memberId == memberId && 
                                                <span className="commentDelete" style={{cursor:'pointer'}} onClick={()=>{ModalOpen(item.commentId)}}>삭제</span>
                                            }
                                        </div>
                                    <div className='realcomment'>{item.comment}</div>
                                </div>
                                <div className={`checkbackground ${modal ? 'show' : ''}`} style={{backgroundColor:'transparent'}} onClick={ModalClose}>
                                    <div className='checkdelete' onClick={notClose}> 
                                        <div className='checkword'>정말로 삭제하시겠습니까?</div>
                                        <div className='checkword2'>
                                            <div className='checkoutdelete' onClick={ModalClose}>취소</div>
                                            <div className='delete' onClick={deletecomment}>삭제하기</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
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
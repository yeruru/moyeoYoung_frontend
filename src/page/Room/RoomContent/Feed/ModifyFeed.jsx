import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ModifyFeed.css';
import axios from 'axios';

function ModifyFeed ({isOpen, content, onClose, roomId}) {
    const [textCount, setTextCount] = useState(0);
    const [photosName, setPhotosName] = useState([]);
    const [show, setShow] = useState(false);
    const [feed, setFeed] = useState({title:'', content:'' ,userId : 0, feedId : 0, filename : ''});
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BURL}/feed/detailfeed/${content}`)
        .then(res=>{
            setFeed(prevFeedDetail => ({
                ...prevFeedDetail,
                feedId : content,
                title : res.data.title,
                content : res.data.content,
                filename : res.data.filename,
              }));
        })
        .catch(err=>{
        });
    },[content]);

    const text = (e) => {
        setTextCount(e.target.value.length);
        const name = e.target.name;
        const value = e.target.value;
        setFeed({...feed, [name]:value})  
    };

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFeed({...feed, [name]:value})    
    };

    const open = () => {
        if(feed.title == ''){
            window.confirm("제목을 입력해주세요");
        }else if(feed.content==''){
            window.confirm("내용을 입력해주세요");
        }else if(feed.filename == ''){
            const result = window.confirm("사진을 업로드해주세요");
        }else{
            setModalOpen(!modalOpen);
            document.getElementById("body").style.overflowY="hidden";
        };
    };

    const close = () => {
        setModalOpen(!modalOpen);
        document.getElementById("body").style.overflowY="scroll";
    };

    const notclose = (event) => {
        event.stopPropagation();
    }

    useEffect(() => {
        setFeed(prevFeed => ({
          ...prevFeed,
          filename: photosName,
          roomId : roomId
        }));
        
    }, [photosName, roomId]);

    const feedImgDelete = (index) => {
        const array = feed.filename.toString().split(',')
        if(array.length <= 1){
            alert("사진은 1장이상은 필수입니다");
            return;
        }
        array.splice(index, 1);
        const imagename = array.toString();
        setFeed(prevFeed => ({
            ...prevFeed,
            filename : imagename
        }));
    };
    
    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', feed.title);
        formData.append('content', feed.content);
        formData.append('feedId', feed.feedId);
        formData.append('userId', feed.userId);
        formData.append('filename', feed.filename);
        axios.post(`${process.env.REACT_APP_BURL}/feed/modifyfeed/${feed.feedId}`, formData)
        .then(res => {
            console.log(res);
            document.location.href=`/roomMain/roomFeed/${roomId}`; 
        })
        .catch(err => {
            console.log(err);
        })
    };
    return(
    <div className={`modifybackground ${isOpen ? 'show' : ''}`}  onClick={onClose}>
        <div className='modifyfeed' onClick={notclose}>
            <div className='feedwrite'>
                <Swiper 
                    style={{margin: '30px auto',width:'450px', height:'250px', overflow:'hidden', borderRadius: '10px'}}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    className='show'
                >
                {
                feed.filename.toString().split(',').map((item, index) => ( // 여기서 맵 함수를 사용할 수 있도록 수정
                    <SwiperSlide key={index}>
                        <div className='feedImg' style={{backgroundImage : `url(${process.env.REACT_APP_BURL}/room/view/${item})`}}>
                            <div className='feedX'onClick={() => feedImgDelete(index)}>X</div>
                        </div>
                    </SwiperSlide>
                    ))
                }
                </Swiper>
                {/* <label htmlFor="input-file" className={`${show ? 'noshow' : ''}`}>
                    <div className='photes'>
                        <div className='plus'><span className='plusfont'>+</span></div>
                    </div>
                </label>
                <input className="fileimage" type="file" name="filename" id="input-file" multiple accept="image/jpeg, image/png, image/gif"/>  */}
                <div className='feedTitle'>
                    <input className='title' maxLength={20} name="title" onChange={change} value={feed.title}></input>
                </div>
                <div className='feedContent'>
                    <textarea className='content' name="content" maxLength={299}  value={feed.content} onChange={text}></textarea>
                    <p className="txt-length">( {textCount} / 300 )</p>
                </div>
                <div className='feedbutton'>
                    <input type="submit" className="btn btn2" onClick={open} value={'수정하기'}/>
                </div>  
            </div>  
            <div className={`checkbackground ${modalOpen ? 'show' : ''}`}  onClick={close}>
                <div className='checkWrite' onClick={notclose}> 
                    <div className='checkword'>글을 수정하시겠습니까?</div>
                    <div className='checkword2'>
                        <div className='checkoutWrite' onClick={close}>돌아가기</div>
                        <div className= 'submit' onClick={submit}>수정하기</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModifyFeed;
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './WriteFeed.css';
import axios from 'axios';
function WriteFeed ({roomId}){
    const [textCount, setTextCount] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [photosName, setPhotosName] = useState([]);
    const [show, setShow] = useState(false);
    const [files, setfiles] = useState([]);
    const [feed, setFeed] = useState({title:'', content:'' ,userId : 0, roomId:0, filename : ''});

    const text = (e) => {
        setTextCount(e.target.value.length);
        const name = e.target.name;
        const value = e.target.value;
        setFeed({...feed, [name]:value})  
    }

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFeed({...feed, [name]:value})    
    }

    const filechange = (e) => {
        const files = e.target.files;
        Array.from(files).forEach(file => {
            setfiles((prevFiles)=> [...prevFiles, file]);
            const reader = new FileReader();
            setPhotosName((prevPhotosName)=> [...prevPhotosName, file.name]);
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPhotos((prevPhotos) => [...prevPhotos, reader.result])
            };
        });
        setShow(!show);
    };

    useEffect(() => {
        setFeed(prevFeed => ({
          ...prevFeed,
          filename: photosName,
          roomId : roomId
        }));
    }, [photosName, roomId]);


    const submit = (e) => {
        if(feed.title == ''){
            alert("제목을 입력해주세요")
        }else if(feed.content=='')(
            alert("내용을 입력해주세요")
        )
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', feed.title);
        formData.append('content', feed.content);
        formData.append('userId', feed.userId);
        formData.append('roomId', feed.roomId);
        formData.append('filename', feed.filename);
        formData.append('files', files);
        Object.values(files).forEach((file)=> formData.append("files", file));
        axios.post(`http://localhost:8090/feed/writefeed/${feed.roomId}`, formData,{
            headers: {
                "Content-Type": `multipart/form-data; `,
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return(
        <div className='writefeed'>
            <div className='feedwrite'>
                <Swiper 
                    style={{marginTop: '80px',width:'500px', height:'300px', overflow:'hidden', borderRadius: '10px'}}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    className={`${show ? 'show' : 'noshow'}`}
                >
                {
                photos.map((item) => ( // 여기서 맵 함수를 사용할 수 있도록 수정
                    <SwiperSlide key={item}>
                        <div className='feedImg' style={{backgroundImage : `url(${item})`}}></div>
                    </SwiperSlide>
                    ))
                }
                </Swiper>
                <label htmlFor="input-file" className={`${show ? 'noshow' : ''}`}>
                    <div className='photes'>
                        <div className='plus'><span className='plusfont'>+</span></div>
                    </div>
                </label>
                <input className="fileimage" type="file" name="filename" id="input-file" onChange={filechange} multiple/> 
                 <div className='feedTitle'>
                    <div>제목</div>
                    <input className='title' maxLength={20} name="title" onChange={change} placeholder='제목을 작성해주세요'></input>
                </div>
                <div className='feedContent'>
                    <div>내용</div>
                    <textarea className='content' name="content" maxLength={299}  placeholder='내용을 작성해주세요' onChange={text}></textarea>
                    <p className="txt-length">( {textCount} / 300 )</p>
                </div>
                <div className='feedbutton'>
                    <input type="button" className="btn btn1" value={'돌아가기'}/>
                    <input type="submit" className="btn btn2" onClick={submit} value={'작성하기'}/>
                </div> 
            </div>  
        </div>
    )
}
export default WriteFeed;
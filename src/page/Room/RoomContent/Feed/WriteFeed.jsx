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
    const [files, setFiles] = useState([]);
    const [feed, setFeed] = useState({title:'', content:'' ,userId : 0, roomId:0, filename : ''});
    const [modalOpen, setModalOpen] = useState(false);

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

    const filechange = (e) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        const files = e.target.files;
        Array.from(files).forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                alert('이미지 파일만 업로드 가능합니다.');
                e.target.value = null;
                setShow(show);
                return;
            }else{
                setFiles(prevFiles=> [...prevFiles, file]);
                setPhotosName((prevPhotosName)=> [...prevPhotosName, file.name]);
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setPhotos((prevPhotos) => [...prevPhotos, reader.result])
                };
                setShow(!show);
            } 
        });
    };
    useEffect(() => {
        setFeed(prevFeed => ({
          ...prevFeed,
          filename: photosName,
          roomId : roomId
        }));
    }, [photosName, roomId]);

    const feedImgDelete = (index) => {
        setPhotos(prevPhotos => {
            const updatedPhotos = [...prevPhotos];
            updatedPhotos.splice(index, 1);
            return updatedPhotos
        });
        setPhotosName(prevPhotos => {
            const updatedPhotosName = [...prevPhotos];
            updatedPhotosName.splice(index, 1);
            setFeed(prevFeed => ({
                ...prevFeed,
                filename: updatedPhotosName,
            }));
            return updatedPhotosName;
        });
        setFiles(prevFiles => {
            const updatedFiles = [...prevFiles];
            updatedFiles.splice(index, 1);
            return updatedFiles;
        });
        if(photos.length != 1){
            setShow(show);
        }else{
            setShow(!show);
        }
    };
    
    const submit = (e) => {
        e.preventDefault();
        console.log("asdf");
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
            document.location.href=`/roomMain/roomFeed/${roomId}`; 
        })
        .catch(err => {
            console.log(err);
        })
    };

    const notclose = (event) => {
        event.stopPropagation();
    }

    return(
        <div className='writefeed'>
            <div className='feedwrite'>
                <Swiper 
                    style={{margin: '30px auto',width:'500px', height:'300px', overflow:'hidden', borderRadius: '10px'}}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    className={`${show ? 'show' : 'noshow'}`}
                >
                {
                photos.map((item, index) => ( // 여기서 맵 함수를 사용할 수 있도록 수정
                    <SwiperSlide key={index}>
                            <div className='feedImg' style={{backgroundImage : `url(${item})`
                             }}>
                            <div className='feedX'onClick={() => feedImgDelete(index)}>X</div>
                        </div>
                    </SwiperSlide>
                    ))
                }
                </Swiper>
                <label htmlFor="input-file" className={`${show ? 'noshow' : ''}`}>
                    <div className='photes'>
                        <div className='plus'><span className='plusfont'>+</span></div>
                    </div>
                </label>
                 <input className="fileimage" type="file" name="filename" id="input-file" onChange={filechange} multiple accept="image/jpeg, image/png, image/gif"/> 
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
                    <input type="submit" className="btn btn2" onClick={open} value={'작성하기'}/>
                </div>  
            </div>  
            <div className={`checkbackground ${modalOpen ? 'show' : ''}`}  onClick={close}>
                <div className='checkWrite' onClick={notclose}> 
                    <div className='checkword'>글을 작성하시겠습니까?</div>
                    <div className='checkword2'>
                        <div className='checkoutWrite' onClick={close}>돌아가기</div>
                        <div className= 'submit' onClick={submit}>작성하기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WriteFeed;
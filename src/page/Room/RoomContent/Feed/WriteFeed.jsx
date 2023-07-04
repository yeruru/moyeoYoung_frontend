import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './WriteFeed.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { display } from '@mui/system';
function WriteFeed (){
    const [textCount, setTextCount] = useState(0);
    const [photos, setPhotos] = useState([]);
    const [show, setShow] = useState(false);
    
    const text = (e) => {
        setTextCount(e.target.value.length);
    }

    const filechange = (e) => {
        const files = e.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPhotos((prevPhotos) => [...prevPhotos, reader.result])
            };
        });
        setShow(!show);
    };


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
                <input className="fileimage" type="file"  id="input-file" onChange={filechange} multiple/> 
                 <div className='feedTitle'>
                    <div>제목</div>
                    <input className='title' maxLength={20} placeholder='제목을 작성해주세요'></input>
                </div>
                <div className='feedContent'>
                    <div>내용</div>
                    <textarea className='content' maxLength={299} placeholder='내용을 작성해주세요' onChange={text}></textarea>
                    <p className="txt-length">( {textCount} / 300 )</p>
                </div>
                <div className='feedbutton'>
                    <input type="button" className="btn btn1" value={'돌아가기'}/>
                    <input type="submit" className="btn btn2" value={'작성하기'}/>
                </div> 
            </div>  
        </div>
    )
}
export default WriteFeed;
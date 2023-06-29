import React from 'react'
import './MakeRoom.css'
import { useState, useRef } from 'react';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import axios from 'axios';

function MakeRoom() {
    const [activeCate, setActiveCate] = useState('');
    const [checkCateVal, setCheckCateVal] = useState(''); 
    const [txtLength, settxtLength] = useState('0');
    const [imgSrc, setImgSrc] = useState('/image/room_basic1.jpg');
    const inputRef = useRef();

    //소개글 글자수
    let changeLength = (e) => {
        settxtLength(e.target.value.length);
    }
    //기본이미지선택
    const changeImg = (e) => {
         setImgSrc(e.target.src);
    }
    //사진클릭>input실행
    const clickImg = () => {
        inputRef.current.click();
    }
    //사진클릭
    const selectImg = (e) => { 
        const imgFile = e.target;
        const file = imgFile.files[0];
        if(imgFile.files && imgFile.files[0]){
            const reader = new FileReader() 
            reader.onload = ()=> { 
                setImgSrc(reader.result);
            }
            reader.readAsDataURL(file);

        }
            
    }

    //submit
    const submit=()=>{ 
    }
  
    //카테고리 선택시 색변경+값
    const changeColor = (e) => {
        setActiveCate(e.target.id);
        setCheckCateVal(e.target.value);
        console.log(checkCateVal);
    }

    return (
        <div id='make-room'>
            <div className='wrap'>
                <span className='bar'></span>
                <h1 className='h1'>모임방 개설</h1>
                <ul className="content">
                    <li className="tbox">
                        <p className="txt1">모임명</p>
                        <input type='text' className='ipbox' maxLength={40} accept='image/*' name='roomTitle' id='room-title' placeholder='모임명을 입력해 주세요' required />
                    </li>
                    <li className="tbox">
                        <p className="txt1">소개글</p>
                        {/* <input type='text' className='ipbox' name='roomName' id='room-name' placeholder='모임에 대해 간략한 소개를 작성해 주세요(200자 제한)' /> */}
                        <textarea maxLength={300} className='ipbox-area' name='roomContent' id='room-intro' onChange={changeLength} placeholder='모임에 대해 간략한 소개를 작성해 주세요(300자 제한)' required ></textarea>
                        <p className="txt-length">( {txtLength} / 300 )</p>

                    </li>
                    <li className="tbox">
                        <p className="txt1">대표사진 선택</p> 
                        <div className='img-box'> 
                        <div>
                            <img src={imgSrc} className='select-img' name="roomImage" required />
                        </div>
                        <ul className='imgs'>
                            {/* <div className='imgs'> */}
                            <li className='img img2'  onClick={clickImg}>
                                <CenterFocusWeakIcon className='icon-size'/>
                                <p className='p5'>사진을 업로드 하세요.</p>
                            </li>
                            <input type='file' className='upload' name="file" ref={inputRef} id='file' onChange={selectImg}/>
                            <li><img src="/image/room_basic2.jpg" alt="" className='img selectable' onClick={changeImg} /></li>
                            <li><img src="/image/room_basic3.jpg" alt="" className='img selectable' onClick={changeImg} /></li>
                            {/* </div> */}
                            {/* <div className='imgs'> */}
                            <li><img src="/image/room_basic4.jpg" alt="" className='img selectable' onClick={changeImg} /></li>
                            <li><img src="/image/room_basic5.jpg" alt="" className='img selectable' onClick={changeImg} /></li>
                            <li><img src="/image/room_basic6.jpg" alt="" className='img selectable' onClick={changeImg} /></li>
                            {/* </div> */}
                        </ul>
                        </div> 
                    </li>
                    <li className="tbox">
                        <p className="txt1">모임방 공개설정</p>
                        <div className='public-box'>
                            <div className='pbox'>
                                <input type='radio' name='setting' id="setting-label1" className='radio txt2' defaultChecked/><label htmlFor="setting-label1" >공개방</label>
                                <p className='txt3'>누구나 모임을 검색할 수 있고,<br />
                                    모임 소개와 게시글을 볼 수 있습니다. <br />
                                    별도의 가입 절차가 필요하지 않습니다.</p>
                            </div>
                            <div className='pbox'>

                                <input type='radio' name='setting' id="setting-label2" className='radio txt2' /><label htmlFor="setting-label2" >비공개방</label>
                                <p className='txt3'>누구나 모임을 검색할 수 있지만<br />
                                    모임과 게시글이 공개되지 않습니다.<br />
                                    가입신청시 방장의 수락이 필요합니다.</p>
                            </div>
                        </div>

                    </li>
                    <li className="tbox">
                        <p className="txt1">카테고리를 선택하세요</p>
                        <div className='cate-box'>
                            <div className='cate-btns'>
                                <button id='b1' className={`cate-btn ${activeCate == 'b1' ? 'change' : ''}`} onClick={changeColor} value="취업준비">
                                    <img id='b1' src="/image/icon/icon1.png" className="cate-icon" onClick={changeColor} />
                                    <p id='b1' className='txt4' onClick={changeColor}>취업준비</p>
                                </button>

                                <button id='b2' className={`cate-btn ${activeCate == 'b2' ? 'change' : ''}`} onClick={changeColor} value="스터디">
                                    <img id='b2' src="/image/icon/icon2.png" className="cate-icon" onClick={changeColor} />
                                    <p id='b2' className='txt4' onClick={changeColor}>스터디</p>
                                </button>

                                <button id='b3' className={`cate-btn ${activeCate == 'b3' ? 'change' : ''}`} onClick={changeColor} value="과외">
                                    <img id='b3' src="/image/icon/icon3.png" className="cate-icon" />
                                    <p id='b3' className='txt4'>과외/멘토</p>
                                </button>

                                <button id='b4' className={`cate-btn ${activeCate == 'b4' ? 'change' : ''}`} onClick={changeColor} value="자기개발">
                                    <img id='b4' src="/image/icon/icon4.png" className="cate-icon" />
                                    <p id='b4' className='txt4'>자기개발</p>
                                </button>
                            </div>

                            <div className='cate-btns'>
                                <button id='b5' className={`cate-btn ${activeCate == 'b5' ? 'change' : ''}`} onClick={changeColor} value="프로젝트">
                                    <img id='b5' src="/image/icon/icon5.png" className="cate-icon" />
                                    <p id='b5' className='txt4'>프로젝트</p>
                                </button>

                                <button id='b6' className={`cate-btn ${activeCate == 'b6' ? 'change' : ''}`} onClick={changeColor} value="동아리">
                                    <img id='b6' src="/image/icon/icon6.png" className="cate-icon" />
                                    <p id='b6' className='txt4'>동아리</p>
                                </button>

                                <button id='b7' className={`cate-btn ${activeCate == 'b7' ? 'change' : ''}`} onClick={changeColor} value="친목">
                                    <img id='b7' src="/image/icon/icon7.png" className="cate-icon" />
                                    <p id='b7' className='txt4'>친목</p>
                                </button>

                                <button id='b8' className={`cate-btn ${activeCate == 'b8' ? 'change' : ''}`} onClick={changeColor} value="기타">
                                    <span id='b8' className="material-symbols-outlined plus" onClick={changeColor}>
                                        add
                                    </span>
                                    <p id='b8' className='txt4' onClick={changeColor} >기타</p>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className='sm-btns'>
                    <input type='button' className='back-btn smb' value='돌아가기' />
                    <input type='submit' className='submit-btn smb' value='모임개설' onClick={submit}/>
                </div>

            </div>
        </div>
    )
}

export default MakeRoom;
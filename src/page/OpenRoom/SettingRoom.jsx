import React from 'react'
import './MakeRoom.css'
import { useState, useRef, useEffect } from 'react';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';


export const SettingRoom = () => {
    const [activeCate, setActiveCate] = useState('');
    const [txtLength, settxtLength] = useState();
    const [imgSrc, setImgSrc] = useState('');
    const inputRef = useRef();
    const [room, setRoom] = useState({})
    const [file, setFile] = useState();
    const [modal, setModal] = useState(false);
    // const [roomId, setRoomId] = useState();
    const [ContentText, setContentText] = useState('');
    const {roomId} = useParams();

    const instance = axios.create({
        baseURL: 'http://localhost:8090/room', // 기본 경로 설정
      });  

    useEffect(()=>{
        instance.get(`/getroomMain/${roomId}`)
        .then(res=>{
            setRoom({...res.data});
            switchCateId(res.data.roomCategory);
            const txt=res.data.roomContent.replace(/<br\/>/g, '');
            settxtLength(txt.length);
            setContentText(txt);
            setImgSrc(`http://localhost:8090/room/view/${res.data.roomImage}`)
            
            
            
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    //소개글 글자수
    const changeLength = (e) => {
        settxtLength(e.target.value.length);
    }
    //사진클릭>input실행
    const clickImg = () => {
        inputRef.current.click();
    }
    //사진클릭
    const selectImg = (e) => {
        const imgFile = e.target;
        const file = imgFile.files[0];
        if (imgFile.files && imgFile.files[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                setImgSrc(reader.result);
            }
            reader.readAsDataURL(file);

        }

    }

    //room만들기 =======================================================
    const content = (e) => {
        changeRoom(e);
        changeLength(e);
    }
    //기본이미지선택
    const basicImg = (e) => {
        setImgSrc(e.target.src); //이미지 출력 프론트
        //백엔드 이름 넘겨주기  
            setRoom({ ...room, 'roomImage': e.target.name });
        
    }
    //사용자설정이미지
    const inputImg = (e) => {
        selectImg(e); //이미지 출력 프론트
        //백엔드 이름 넘겨주기
        setRoom({ ...room, 'roomImage': e.target.files[0].name });
        setFile(e.target.files[0]);
    }
    const type = (e) => {
        changeRoom(e);
    }

    const changeRoom = (e) => { //제목/내용 설정
        const name = e.target.name;
        const value = e.target.value;

        setRoom({ ...room, [name]: value });
    }


    //==================================================================



    //submit
    const submit = () => {
        const formData = new FormData();
        formData.append('roomId', room.roomId);
        formData.append('roomTitle', room.roomTitle);
        formData.append('roomContent', room.roomContent);
        formData.append('roomImage', room.roomImage);
        formData.append('roomCategory', room.roomCategory);
        formData.append('roomType', room.roomType);
        formData.append('file', file);
        
        axios.post(`http://localhost:8090/room/makeRoom`, formData)
            .then(res => {
                document.location.href=`/roomMain/dashboard/${res.data}`; 
            })
            .catch(err => {
                console.log(err);
            })
    }

    //카테고리 선택시 색변경+값
    const cateBtn = (e) => {
        const id = e.target.id;
        setActiveCate(id);
        switchCateVal(id);
    }

    const switchCateVal = (id) => {
        switch (id) {
            case 'b1': setRoom({ ...room, 'roomCategory': '취업준비' }); break;
            case 'b2': setRoom({ ...room, 'roomCategory': '스터디' }); break;
            case 'b3': setRoom({ ...room, 'roomCategory': '과외/멘토' }); break;
            case 'b4': setRoom({ ...room, 'roomCategory': '자기개발' }); break;
            case 'b5': setRoom({ ...room, 'roomCategory': '프로젝트' }); break;
            case 'b6': setRoom({ ...room, 'roomCategory': '동아리' }); break;
            case 'b7': setRoom({ ...room, 'roomCategory': '친목' }); break;
            case 'b8': setRoom({ ...room, 'roomCategory': '기타' }); break;
        }

    }

    const switchCateId = (val) => {
        switch (val) {
            case '취업준비': setActiveCate('b1') ; break;
            case '스터디':  setActiveCate('b2'); break;
            case '과외/멘토': setActiveCate('b3'); break;
            case '자기개발':setActiveCate('b4'); break;
            case '프로젝트': setActiveCate('b5'); break;
            case '동아리': setActiveCate('b6'); break;
            case '친목': setActiveCate('b7'); break;
            case '기타': setActiveCate('b8'); break;
        }

    }

    const onModal = (e) => { 
        e.preventDefault(); 
        if (
            room.roomTitle.trim() === '' ||
            room.roomContent.trim() === '' ||
            room.roomImage.trim() === '' ||
            room.roomCategory.trim() === '' ||
            room.roomType.trim() === ''
        ) {
            // 필수 값 중 하나라도 비어있는 경우, 다음 페이지로의 이동을 막음
            alert('모든 필드를 입력해주세요.');
            return;
        } 
        setModal(true);
    }
    const offModal = () => {
        setModal(false);
    }
    return (
        <>
            <div id='make-room'>
                <div className='wrap'>
                    <span className='bar'></span>
                    <h1 className='h1'>모임방 개설</h1>
                    <ul className="content">
                        <li className="tbox">
                            <p className="txt1">모임명</p>
                            <input type='text' className='setting-ipbox' name='roomTitle' id='room-title' readOnly defaultValue={room.roomTitle}/>
                        </li>
                        <li className="tbox">
                            <p className="txt1">소개글</p>
                            {/* <input type='text' className='ipbox' name='roomName' id='room-name' placeholder='모임에 대해 간략한 소개를 작성해 주세요(200자 제한)' /> */}
                            <textarea maxLength={300} className='ipbox-area' name='roomContent' id='room-intro' onChange={content} defaultValue={ContentText} required ></textarea>
                            <p className="txt-length">( {txtLength} / 300 )</p>

                        </li>
                        <li className="tbox">
                            <p className="txt1">대표사진 선택</p>
                            <div className='img-box'>
                                <div className='select-img-div'>
                                    <img src={imgSrc} className='select-img' name="roomImage" accept="image/**" required />
                                </div>
                                <ul className='imgs'>
                                    {/* <div className='imgs'> */}
                                    <li className='img img2' onClick={clickImg}>
                                        <CenterFocusWeakIcon className='icon-size' />
                                        <p className='p5'>사진을 업로드 하세요.</p>
                                    </li>
                                    <input type='file' className='upload' name="roomImage" ref={inputRef} id='file' onChange={inputImg} />
                                    <li><img src="/image/room_basic2.jpg" alt="" className='img selectable' name='room_basic2.jpg' onClick={basicImg} /></li>
                                    <li><img src="/image/room_basic3.jpg" alt="" className='img selectable' name='room_basic3.jpg' onClick={basicImg} /></li>
                                    {/* </div> */}
                                    {/* <div className='imgs'> */}
                                    <li><img src="/image/room_basic4.jpg" alt="" className='img selectable' name='room_basic4.jpg' onClick={basicImg} /></li>
                                    <li><img src="/image/room_basic5.jpg" alt="" className='img selectable' name='room_basic5.jpg' onClick={basicImg} /></li>
                                    <li><img src="/image/room_basic6.jpg" alt="" className='img selectable' name='room_basic6.jpg' onClick={basicImg} /></li>
                                    {/* </div> */}
                                </ul>
                            </div>
                        </li>
                        <li className="tbox">
                            <p className="txt1">모임방 공개설정</p>
                            <div className='public-box'>
                                <div className='pbox'>
                                    <input type='radio' name='roomType' id="setting-label1" className='radio'  onChange={type} checked={room.roomType === 'open'}  value='open' /><label htmlFor="setting-label1" className='txt2'>공개방</label>
                                    <p className='txt3'>누구나 모임을 검색할 수 있고,<br />
                                        모임 소개와 게시글을 볼 수 있습니다. <br />
                                        별도의 가입 절차가 필요하지 않습니다.</p>
                                </div>
                                <div className='pbox'>

                                    <input type='radio' name='roomType' id="setting-label2" className='radio'  onChange={type} checked={room.roomType === 'close'} value='close' /><label htmlFor="setting-label2" className='txt2'>비공개방</label>
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
                                    <button id='b1' className={`cate-btn ${activeCate == 'b1' ? 'change' : ''}`} onClick={cateBtn} value="취업준비">
                                        <img id='b1' src="/image/icon/icon1.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b1' className='txt4' onClick={cateBtn}>취업준비</p>
                                    </button>

                                    <button id='b2' className={`cate-btn ${activeCate == 'b2' ? 'change' : ''}`} onClick={cateBtn} value="스터디">
                                        <img id='b2' src="/image/icon/icon2.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b2' className='txt4' onClick={cateBtn}>스터디</p>
                                    </button>

                                    <button id='b3' className={`cate-btn ${activeCate == 'b3' ? 'change' : ''}`} onClick={cateBtn} value="과외/멘토">
                                        <img id='b3' src="/image/icon/icon3.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b3' className='txt4' onClick={cateBtn}>과외/멘토</p>
                                    </button>

                                    <button id='b4' className={`cate-btn ${activeCate == 'b4' ? 'change' : ''}`} onClick={cateBtn} value="자기개발">
                                        <img id='b4' src="/image/icon/icon4.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b4' className='txt4' onClick={cateBtn}>자기개발</p>
                                    </button>
                                </div>

                                <div className='cate-btns'>
                                    <button id='b5' className={`cate-btn ${activeCate == 'b5' ? 'change' : ''}`} onClick={cateBtn} value="프로젝트">
                                        <img id='b5' src="/image/icon/icon5.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b5' className='txt4' onClick={cateBtn}>프로젝트</p>
                                    </button>

                                    <button id='b6' className={`cate-btn ${activeCate == 'b6' ? 'change' : ''}`} onClick={cateBtn} value="동아리">
                                        <img id='b6' src="/image/icon/icon6.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b6' className='txt4' onClick={cateBtn}>동아리</p>
                                    </button>

                                    <button id='b7' className={`cate-btn ${activeCate == 'b7' ? 'change' : ''}`} onClick={cateBtn} value="친목">
                                        <img id='b7' src="/image/icon/icon7.png" className="cate-icon" onClick={cateBtn} />
                                        <p id='b7' className='txt4' onClick={cateBtn}>친목</p>
                                    </button>

                                    <button id='b8' className={`cate-btn ${activeCate == 'b8' ? 'change' : ''}`} onClick={cateBtn} value="기타">
                                        <span id='b8' className="material-symbols-outlined plus" onClick={cateBtn}>
                                            add
                                        </span>
                                        <p id='b8' className='txt4' onClick={cateBtn}>기타</p>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    <div className='sm-btns'>
                    <Link to="/roomlist"><input type='button' className='back-btn smb' value='취소하기' /></Link>
                        <input type='submit' className='submit-btn smb' value='변경하기' onClick={onModal} />
                    </div>

                </div>

                <div id='make-Room-modal' className={`hidden ${modal? 'play':''}`}>
                    <div className="modal-box">
                        <CloseIcon id="icon" onClick={offModal} />
                        <p className='txt'>방의 설정을 수정하시겠습니까?</p>
                        <div className="modal-imgdiv">
                            <img src="/image/group 67.svg" className='modal-img' alt='메세지 보내는 그림' />
                        </div>
                        <div className="modal-btns">
                          <button type='button' className="btn btn1" onClick={offModal}>취소하기</button>
                            <button type='submit' className="btn btn2" onClick={submit}>변경하기</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

import React from 'react'
import './MakeRoom.css'

function MakeRoom() {
    return (
        <div id='make-room'>
            <div className='wrap'>
                <ul class="content"> 
                    <li className="tbox">
                        <p className="txt1">모임명</p>
                        <input type='text' className='ipbox' name='roomName' id='room-name' placeholder='모임명을 입력해 주세요' />
                    </li>
                    <li className="tbox">
                        <p className="txt1">소개글</p>
                        <input type='text' className='ipbox' name='roomName' id='room-name' placeholder='모임에 대해 간략한 소개를 작성해 주세요(200자 제한)' />
                    </li>
                    <li className="tbox">
                        <p className="txt1">대표사진 선택</p>
                        <div className='select-img'>
                            <span class="material-symbols-outlined plus">
                                add
                            </span>
                        </div>
                        <div className='choose-img'>
                            <div className='imgs'>
                                <img src="" alt="" className='img' />
                                <img src="" alt="" className='img' />
                                <img src="" alt="" className='img' />
                            </div>
                            <div className='imgs'>
                                <img src="" alt="" className='img' />
                                <img src="" alt="" className='img' />
                                <img src="" alt="" className='img' />
                            </div>
                        </div>
                    </li>
                    <li className="tbox">
                        <p className="txt1">모임방 공개설정</p>
                        {/* <div className='public-box'>
                            <div className='pbox'>
                                <p  className='txt2'>공개방</p>
                                <p className='txt3'>누구나 모임을 검색할 수 있고,<br />
                                    모임 소개와 게시글을 볼 수 있습니다. <br />
                                    별도의 가입 절차가 필요하지 않습니다.</p>
                            </div>
                            <div className='pbox'>

                                <p className='txt2'>비공개방</p>
                                <p className='txt3'>누구나 모임을 검색할 수 있지만<br />
                                    모임과 게시글이 공개되지 않습니다.<br />
                                    가입신청시 방장의 수락이 필요합니다.</p>
                            </div>
                        </div> */}

                        <div className='public-box'>
                            <div className='pbox'>
                                <p className='txt2'><input type='radio' name='setting' className='radio' />공개방</p>
                                <p className='txt3'>누구나 모임을 검색할 수 있고,<br />
                                    모임 소개와 게시글을 볼 수 있습니다. <br />
                                    별도의 가입 절차가 필요하지 않습니다.</p>
                            </div>
                            <div className='pbox'>

                                <p className='txt2'><input type='radio' name='setting' className='radio' />비공개방</p>
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
                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>취업준비</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>스터디</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>과외/멘토</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>자기개발</p>
                                </button>
                            </div>

                            <div className='cate-btns'>
                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>프로젝트</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>동아리</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>친목</p>
                                </button>

                                <button className='cate-btn'>
                                    <span class="material-symbols-outlined plus">
                                        add
                                    </span>
                                    <p className='txt4'>직접만들기</p>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className='sm-btns'>
                    <input type='button' className='back-btn smb' value='돌아가기'/> 
                    <input type='submit' className='submit-btn smb' value='모임개설'/>
                </div> 

            </div>
        </div>
    )
}

export default MakeRoom;
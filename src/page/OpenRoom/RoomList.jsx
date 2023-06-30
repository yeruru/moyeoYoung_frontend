import React from 'react'
import './RoomList.css'
import { RoomCard } from '../../components/RoomCard/RoomCard'

function RoomList() {
  return (
    <div id='room-list'>
      <div className='wrap'>
        <div className='search-box'>
          <img src='/image/Group 14.svg' className='center-img' />
          <div className='search-position'><input type='text' className='search-text' name='word' placeholder='모임을 검색해 보세요.' />
            <button type='submit'><span className="material-symbols-outlined search-icon">
              search
            </span></button></div>

          <div className='tag-box'>
            <div className='tags'>
              <button type="button" className='tag' value="취업준비"># 취업준비</button>
              <button type="button" className='tag' value="스터디"># 스터디</button>
              <button type="button" className='tag' value="과외"># 과외/면접</button>
              <button type="button" className='tag' value="친목"># 친목</button>
            </div>
            <div className='tags'>
              <button type="button" className='tag' value="프로젝트"># 프로젝트</button>
              <button type="button" className='tag' value="동아리"># 동아리</button>
              <button type="button" className='tag' value="자기개발"># 자기개발</button>
              <button type="button" className='tag' value="기타"># 기타</button>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className="head-box">
            <div className='list-head'>
              <p className='h1'>모여YOUNG 모임</p>
              <p className='p1'>새로운 모임에 참여해 보세요.</p>
            </div>
            <button type='button' className='make-btn'>만들기</button>
          </div>

          <div className="list-box">
            <ul className='card-ul'>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
         
            </ul>
            <ul className='card-ul'>
            <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
              <li className='card-li'>
                <a href="#" className='a-mark'>
                <button className='bookmark'><span className="material-symbols-outlined mark-icon click">
                  bookmark
                </span></button>
                <img src='/image/test.jpg' className='card-img' />
                <p className='p2'>독산역 4번출구 면접스터디 멤버 모집합니다</p>
                <div>
                  <div className='mini-sec'>
                    <p className='p3 pink'>#취업스터디</p>
                    <div className='mini-sec2'>
                      <span className="material-symbols-outlined group-icon">
                        group
                      </span><span className='p4'>20</span>
                    </div>
                  </div>
                </div>
              </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomList
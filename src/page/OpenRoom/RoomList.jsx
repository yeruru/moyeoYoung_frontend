import React from 'react'
import './RoomList.css'
import { RoomCard } from '../../components/RoomCard/RoomCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import nothing from '../../images/Group 153.svg'

function RoomList() {
  const { page } = useParams();
  const [searchCate, setSearchCate] = useState(false);
  const [searchWord, setSearchWord] = useState(false);
  const [curPage, setCurPage] = useState();
  const [allPage, setAllPage] = useState();
  const [roomList, setRoomList] = useState([]);
  const [word, setWord] = useState('');
  const [cateWord, setCateWord] = useState('');
  const containRoomCnt = (roomList.length) % 4;
  const emptyRoomCnt = 4 - containRoomCnt;
  const instance = axios.create({
    baseURL: 'http://localhost:8090/room', // 기본 경로 설정 
  });
  const [isBookmarks, setIsBookmarks] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    getRoomList(page); 
  }, [])

  const getRoomList = (p_page) => {
    setSearchCate(false);
    setSearchWord(false); 


    instance.get(`/roomList/${p_page}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
    )
      .then((res) => {
        if (p_page === 1) {
          setRoomList([...res.data.list]);
        } else {
          setRoomList([...roomList, ...res.data.list]);
        }
        const pageInfo = res.data.pageInfo;
        setCurPage(pageInfo.curPage);
        setAllPage(pageInfo.allPage);
        if(res.data.isBookmarks){
          setIsBookmarks([...res.data.isBookmarks]); 
        }

      })
      .catch(err => {
        console.log(err);
      })
  }

  const callCate = (e) => {
    setCurPage(1);
    setCateWord(e.target.value);
    searchByCateName(e.target.value, 1);
  }

  const searchByCateName = (p_cateName, p_page) => {
    setSearchCate(true);
    setSearchWord(false);

    instance.get(`/roomListByCate/${p_page}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        cateName: p_cateName
      }
    })
      .then((res) => {
        if (p_page === 1) {
          setRoomList([...res.data.list]);
        } else {
          setRoomList([...roomList, ...res.data.list]);
        }
        const pageInfo = res.data.pageInfo;
        setCurPage(pageInfo.curPage);
        setAllPage(pageInfo.allPage);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const callWord = (e) => {
    setCurPage(1);
    searchByWord(word, 1);
  }

  const searchByWord = (p_word, p_page) => {
    setSearchCate(false);
    setSearchWord(true);

    instance.get(`/roomListByWord/${p_page}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }, params: {
        word: p_word
      }
    })
      .then((res) => {
        if (p_page === 1) {
          setRoomList([...res.data.list]);
        } else {
          setRoomList([...roomList, ...res.data.list]);
        }
        const pageInfo = res.data.pageInfo;
        setCurPage(pageInfo.curPage);
        setAllPage(pageInfo.allPage);
      })
      .catch(err => {
        console.log(err);
      })
  }



  const plusRoomList = () => {
    setCurPage(curPage + 1);
    if (searchCate) {
      searchByCateName(cateWord, curPage + 1);
    } else if (searchWord) {
      searchByWord(word, curPage + 1);
    } else {
      getRoomList(curPage + 1);
    }

  }

  const goMakeRoom = (e) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === null) {
      e.preventDefault();
      alert('로그인이 필요합니다');
      navigate('/login');
    } else {
      navigate('/makeRoom');
    }
  }

  return (
    <div id='room-list'>
      <div className='wrap'>
        <div className='search-box'>
          <img src='/image/Group 14.svg' className='center-img' />
          <div className='search-position'><input type='text' className='search-text' name='word' placeholder='모임을 검색해 보세요.' onChange={(e) => setWord(e.target.value)} />
            <button type='button' onClick={callWord}><span className="material-symbols-outlined search-icon">
              search
            </span></button></div>

          <div className='tag-box'>
            <div className='tags'>
              <button type="button" className='tag' value="취업준비" onClick={callCate}># 취업준비</button>
              <button type="button" className='tag' value="스터디" onClick={callCate}># 스터디</button>
              <button type="button" className='tag' value="과외/면접" onClick={callCate}># 과외/면접</button>
              <button type="button" className='tag' value="친목" onClick={callCate}># 친목</button>
            </div>
            <div className='tags'>
              <button type="button" className='tag' value="프로젝트" onClick={callCate}># 프로젝트</button>
              <button type="button" className='tag' value="동아리" onClick={callCate}># 동아리</button>
              <button type="button" className='tag' value="자기개발" onClick={callCate}># 자기개발</button>
              <button type="button" className='tag' value="기타" onClick={callCate}># 기타</button>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className="head-box">
            <div className='list-head'>
              <p className='h1'>모여YOUNG 모임</p>
              <p className='p1'>새로운 모임에 참여해 보세요.</p>
            </div>
            <button type='button' className='make-btn' onClick={goMakeRoom}>만들기</button>
            {/* <Link to="/makeRoom"><button type='button' className='make-btn'>만들기</button></Link> */}
          </div>
          <div className="list-box">
            <ul className='card-ul'>
              {roomList.length === 0 &&
                <div className='empty-item-box'>
                  <div className='empty-img-box'>
                    <img src={nothing} /></div>
                  <p className='empty-p'>모임방이 존재하지 않습니다!</p>
                </div>
              }
              {roomList.map((item, index) => {
                const isBookmark = isBookmarks.some((roomId) => roomId === item.roomId);
                return (
                  <li key={index}>
                    <RoomCard key={item.roomId} isBookmark={isBookmark} item={item} />
                    {/* <RoomCard key={item.roomId} isBookmark = {isBookmark} roomId={item.roomId} title={item.roomTitle} memCnt={item.roomUserCnt} category={item.roomCategory} content={item.roomContent} imgName={item.roomImage} /> */}
                  </li>
                )
              })}
              {containRoomCnt !== 0 && Array(emptyRoomCnt).fill().map((_, index) => (
                <li className='hidden-li' key={index}></li>))
              }
              {
                roomList.length !== 0 && curPage !== allPage &&
                <div className="plusRoomList-div">
                  <button className="plusRoomList" onClick={plusRoomList}>더 보 기</button>
                </div>
              }
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default RoomList;
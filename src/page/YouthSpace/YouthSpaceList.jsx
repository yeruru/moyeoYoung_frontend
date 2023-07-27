import './YouthSpaceList.css'
import React from 'react'
import { SpaceCard } from '../../components/RoomCard/SpaceCard'
import { useEffect, useState } from 'react';
import nothing from '../../images/Group 153.svg'
import axios from 'axios';
export const YouthSpaceList = () => {
    const [spaceList, setSpaceList] = useState([]);
    const [curPage, setCurPage] = useState();
    const [allPage, setAllPage] = useState();
    const [word, setWord] = useState();
    const [searchWord, setSearchWord] = useState(false);
    const [loc, setLoc] = useState('');
    const [place, setPlace] = useState('');
    const [dongList, setDongList] = useState([]);

    const axiosURL = axios.create({
        baseURL: process.env.REACT_APP_BURL+'/youth', // 기본 경로 설정
    });
    useEffect(() => {
        getSpaceList(1);
    }, [])
    const getSpaceList = (p_page) => {
        setSearchWord(false);
        axiosURL.get(`/allYouthSpaceList/${p_page}`)
            .then(res => {
                const list = res.data.list;
                if (p_page === 1) {
                    setSpaceList([...list]);
                } else {
                    setSpaceList([...spaceList, ...list]);
                }
                const pageInfo = res.data.pageInfo;
                setCurPage(pageInfo.curPage);
                setAllPage(pageInfo.allPage);
            })
    }
    const searchByWord = (p_page) => {
        setSearchWord(true);
        axiosURL.get(`/searchSpaceListByWord/${p_page}`,
            {
                params: {
                    word: word,
                }
            })
            .then(res => {
                const list = res.data.list;
                if (p_page === 1) {
                    setSpaceList([...list]);
                } else {
                    setSpaceList([...spaceList, ...list]);
                }
                const pageInfo = res.data.pageInfo;
                setCurPage(pageInfo.curPage);
                setAllPage(pageInfo.allPage);
            })
    }
    const plusPage = () => {
        setCurPage(curPage + 1);
        if (searchWord) {
            searchByWord(curPage + 1);
        }
        getSpaceList(curPage + 1);
    }

    //자치구에 따른 동 리스트 매핑
    const getDongsByDistrict = (e) => {
        setLoc(e.target.value)
        setPlace('전체');
        const districtDongMap = {
            강남구: ['신사동', '논현동', '압구정동', '청담동', '삼성동', '대치동', '역삼동', '도곡동', '개포동', '일원동', '수서동', '세곡동', '자곡동', '율현동'],
            강동구: ['강일동', '상일동', '명일동', '고덕동', '암사동', '천호동', '성내동', '길동', '둔촌동'],
            강북구: ['미아동', '삼양동', '송중동', '송천동', '삼각산동', '번동', '수유동', '우이동', '인수동'],
            강서구: ['염창동', '등촌동', '화곡동', '우장산동', '내발산동', '가양동', '마곡동', '외발산동', '공항동', '방화동'],
            관악구: ['봉천동', '남현동', '신림동'],
            광진구: ['중곡동', '능동', '구의동', '광장동', '자양동', '화양동', '군자동'],
            구로구: ['신도림동', '구로동', '가리봉동', '고척동', '개봉동', '오류동', '항동', '온수동', '궁동'],
            금천구: ['가산동', '독산동', '시흥동'],
            노원구: ['월계동', '공릉동', '하계동', '중계동', '상계동'],
            도봉구: ['쌍문동', '방학동', '창동', '도봉동'],
            동대문구: ['신설동', '용두동', '제기동', '전농동', '답십리동', '장안동', '청량리동', '회기동', '휘경동', '이문동'],
            동작구: ['노량진동', '본동', '상도동', '흑석동', '사당동', '동작동', '대방동', '신대방동'],
            마포구: ['아현동', '공덕동', '염리동', '도화동', '마포동', '용강동', '대흥동', '신수동', '서강동', '서교동', '합정동', '망원동', '성산동', '중동', '상암동'],
            서대문구: ['충현동', '천연동', '북아현동', '신촌동', '연희동', '홍제동', '남가좌동', '북가좌동'],
            서초구: ['서초동', '방배동', '잠원동', '반포동', '양재동', '우면동', '내곡동'],
            성동구: ['왕십리동', '마장동', '사근동', '행당동', '응봉동', '금호동', '옥수동', '성수동', '송정동', '용답동'],
            성북구: ['성북동', '삼선동', '동선동', '돈암동', '안암동', '보문동', '정릉동', '길음동', '하월곡동', '장위동', '석관동'],
            송파구: ['풍납동', '거여동', '마천동', '방이동', '오금동', '송파동', '석촌동', '삼전동', '가락동', '문정동', '장지동', '위례동', '잠실동', '신천동'],
            양천구: ['목동', '신월동', '신정동'],
            영등포구: ['영등포동', '신길동', '여의도동', '당산동', '도림동', '문래동', '양평동', '신길동', '대림동'],
            용산구: ['후암동', '용산동', '남영동', '청파동', '용문동', '효창동', '한강로동', '이촌동', '이태원동', '한남동', '서빙고동', '보광동'],
            은평구: ['녹번동', '불광동', '갈현동', '구산동', '대조동', '응암동', '신사동', '증산동', '수색동', '진관동'],
            종로구: ['청운효자동 ', '사직동', '삼청동', '부암동', '평창동', '무악동', '교남동', '가회동', '가락동', '종로', '장지동', '혜화동', '숭인동', '창신동'],
            중구: ['소공동', '회현동', '명동', '필동', '장충동', '광희동', '을지로동', '신당동', '다산동', '약수동', '청구동', '동화동', '황학동', '중림동'],
            중랑구: ['면목동', '상봉동', '중화동', '묵동', '망우동', '신내동'],
        };

        const list = districtDongMap[e.target.value] || [];
        setDongList(list);
    }

    const searchByLoc=(p_page)=>{

        axiosURL.get(`/searchSpaceListByLoc/${p_page}`,{
            params:{
                loc:loc,
                place:place,
            }
        })
        .then(res=>{
            const list = res.data.list;
            if(p_page===1){
                setSpaceList([...list]);
            }else{
                setSpaceList([...spaceList, ...list]); 
            }
            const pageInfo = res.data.pageInfo;
            setCurPage(pageInfo.curPage);
            setAllPage(pageInfo.allPage);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div id="youth-space-list">
            <div className='wrap'>
                <div className='search-box'>
                    <img src='/image/Group 51.svg' className='center-img' />
                    <div className='search-position'><input type='text' className='search-text' name='word' onChange={(e) => { setWord(e.target.value) }} placeholder='청년공간을 검색해 보세요.' />
                        <button type='button' onClick={() => { searchByWord(1) }}><span className="material-symbols-outlined search-icon">
                            search
                        </span></button></div>

                    <div className='loc-search-position'>
                        <input type='text' className='loc-search-text lst1' value="서울특별시" readOnly></input>
                        <select name="loc" className='loc-search-text lst2' onChange=   {getDongsByDistrict}>
                            <option value="전체">전체</option>
                            <option value="강남구">강남구</option>
                            <option value="강동구">강동구</option>
                            <option value="강북구">강북구</option>
                            <option value="강서구">강서구</option>
                            <option value="관악구">관악구</option>
                            <option value="광진구">광진구</option>
                            <option value="구로구">구로구</option>
                            <option value="금천구">금천구</option>
                            <option value="노원구">노원구</option>
                            <option value="도봉구">도봉구</option>
                            <option value="동대문구">동대문구</option>
                            <option value="동작구">동작구</option>
                            <option value="마포구">마포구</option>
                            <option value="서대문구">서대문구</option>
                            <option value="서초구">서초구</option>
                            <option value="성동구">성동구</option>
                            <option value="성북구">성북구</option>
                            <option value="송파구">송파구</option>
                            <option value="양천구">양천구</option>
                            <option value="영등포구">영등포구</option>
                            <option value="용산구">용산구</option>
                            <option value="은평구">은평구</option>
                            <option value="종로구">종로구</option>
                            <option value="중구">중구</option>
                            <option value="중랑구">중랑구</option>
                        </select>
                        {/* <input type='text' className='loc-search-text lst1' placeholder='동/도로명' ></input> */}
                        {
                            
                                <div>
                                    <select id="dong" className='loc-search-text lst2' value={place} onChange={(e)=>{setPlace(e.target.value)}}>
                                        <option value="전체">전체</option>
                                        {dongList.map((dong, index) => (
                                            <option key={index} value={dong}>
                                                {dong}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            }

                        <button type='button' className='loc-search-btn' onClick={()=>{searchByLoc(1)}}>
                            <span className="material-symbols-outlined search-icon2">
                                search
                            </span></button></div>
                </div>

                <div className='content'>
                    
                    <ul className='card-list'>
                    {spaceList.length == 0 &&
                <div className='empty-item-box'>
                  <div className='empty-img-box'>
                    <img src={nothing} /></div>
                  <p className='empty-p'>등록된 청년공간이 존재하지 않습니다!</p>
                </div>
              }
                        {
                            spaceList.map((item, index) => (
                                <li key={index}><SpaceCard key={index} space={item} /></li>
                            ))
                            // spaceList.map((item,index)=>(
                            //     <li><SpaceCard key={index} place={item.place}/></li>  
                            // ))
                        }
                    </ul>
                </div>
                {
                    curPage < allPage &&
                    <button type='button' className='plus-btn' onClick={plusPage}>더보기</button>
                }
            </div>
        </div>
    )
}

import './YouthSpaceList.css'
import React from 'react'
import { SpaceCard } from '../../components/RoomCard/SpaceCard'
import { useEffect,useState } from 'react';
import axios from 'axios';
export const YouthSpaceList = () => {
    const [spaceList,setSpaceList] =useState([]);
    const [curPage,setCurPage] =useState();
    const [allPage,setAllPage] =useState();
    const axiosURL = axios.create({
        baseURL: 'http://localhost:8090/youth', // 기본 경로 설정
      }); 
    useEffect(()=>{
        getSpaceList(1);
    },[])
    const getSpaceList=(p_page)=>{
        axiosURL.get(`/allYouthSpaceList/${p_page}`)
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
    }

    const plusPage=()=>{
        setCurPage(curPage+1);
        getSpaceList(curPage+1);
    }

    return (
        <div id="youth-space-list">
            <div className='wrap'>
                <div className='search-box'>
                    <img src='/image/Group 51.svg' className='center-img' />
                    <div className='search-position'><input type='text' className='search-text' name='word' placeholder='청년공간을 검색해 보세요.' />
                        <button type='submit'><span className="material-symbols-outlined search-icon">
                            search
                        </span></button></div>
                </div>

                <div className='content'>
                    <ul className='card-list'>
                        {
                            spaceList.map((item,index)=>(
                                <li key={index}><SpaceCard space={item}/></li>  
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

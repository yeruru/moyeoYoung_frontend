import './YouthSpaceList.css'
import React from 'react'
import { SpaceCard } from '../../components/RoomCard/SpaceCard'

export const YouthSpaceList = () => {
    return (
        <div id="youth-space-list">
            <div className='wrap'>
                <div className='search-box'>
                    <img src='/image/Group 51.svg' className='center-img' />
                    <div className='search-position'><input type='text' className='search-text' name='word' placeholder='청년공간을 검색해 보세요.' />
                        <button type='submit'><span class="material-symbols-outlined search-icon">
                            search
                        </span></button></div>
                </div>

                <div className='content'>
                    <ul className='card-list'>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li>
                        <li><SpaceCard/></li> 
                    </ul>
                </div>

                <button type='button' className='plus-btn'>더보기</button>
            </div>
        </div>
    )
}

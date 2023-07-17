import React from 'react'
import './SpaceCard.css'
import { Link } from 'react-router-dom'
export const SpaceCard = ({space}) => {
    
    return (
        <div id="youth-space-card"> 
        <Link to={`/youthspacedetail/${space.spaceId}`} className='a-card'>
            <div id='card'>
                <div className="card-img-div"> 
                <img src={`https://youth.seoul.go.kr${space.titleImage}`} className='card-img' />
                </div>
                <div className='tbox'>
                    <p className='s-name'>{space.title}</p>
                    <div className='bottom-txt'> 
                    <p className='s-loc'>{space.placeLoc}</p> 
                    <p className='s-time'>{space.openHours}</p>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    )
}

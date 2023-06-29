import React from 'react'
// import '../page/OpenRoom/RoomList.css';
export const RoomCard = () => {
  return ( 
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
             
  )
}

import React, { useEffect } from 'react';
import './WhatYouth.css';
import customCursor from '../../images/mouse.svg';
import whahMain from '../../images/illust/what-main.svg';
import lBalloon from '../../images/illust/left-balloon.svg';
import LBalloon from '../../images/illust/right-balloon.svg';
import what1 from '../../images/illust/what-1.svg';
import whatT1 from '../../images/illust/what-1-1.svg';
import what2 from '../../images/illust/what-2.svg';
import whatT2 from '../../images/illust/what-2-1.svg';
import what3 from '../../images/illust/what-3.svg';
import whatT3 from '../../images/illust/what-3-1.svg';
import what4 from '../../images/illust/what-4.svg';

function WhatYouth() {
  useEffect(() => {
    const airplane = document.querySelector('.airplane');
const airplaneScrollTimeline = document.querySelector('.airplane-scroll-timeline');
const flightPath = document.querySelector('.flight-path');

const pathLength = flightPath.getTotalLength();

// 비행기 초기 위치 설정
airplane.style.offsetDistance = '0%';

// 스크롤 이벤트 핸들러
const handleScroll = () => {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  const scrollPercentage = scrollPosition / (document.documentElement.scrollHeight - window.innerHeight);
  const offsetDistance = scrollPercentage * 100;

  airplane.style.offsetDistance = `${offsetDistance}%`;
};

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll);

return () => {
  // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
  window.removeEventListener('scroll', handleScroll);
};


    }, []);

    

  return (
    <div className="what">
      <div className="wrap-e wrap">
        <div className='what-title'>
          <em>청년공간 & 모여YOUNG</em>
          <h2>활용방법</h2>
          <span className='back'></span>
        </div>
        <div className='what-main'>
          <div className='what-con'>
            <img src={whahMain} alt="활용방법 메인 이미지" className='main-illu' />
            <div className='lBalloon-box'>
              <img src={lBalloon} alt="왼쪽 말풍선" className='lBalloon'/>
              <p>요즘 카페도 눈치보이는데..<br/>어디서 모이지?</p>
            </div>
            <div className='LBalloon-box'>
              <img src={LBalloon} alt="오른쪽 말풍선" className='LBalloon'/>
              <p>프로젝트 준비해야하는데<br/>같이 할사람 없을까..? </p>
            </div>
          </div>
        </div>
        <div className="airplane-scroll-timeline">
          <div className="track a">
            <img className="airplane" src={customCursor} alt="" />
            <svg className="flight-path-svg" viewBox="0 0 1047.79 4304.71" xmlns="http://www.w3.org/2000/svg">
              <path className="flight-path" d="M187.998 0.5C187.998 0.5 175.878 145.137 187.998 236.5C204.913 364.004 276.45 421.648 290.498 549.5C311.767 743.069 187.998 1028.5 187.998 1037.5C187.998 1046.67 177.499 1120.45 80.0001 1117C-17.4989 1113.55 -35.5 970.5 90.4979 964C216.496 957.5 294.045 1306.33 290.498 1581.5C288.143 1764.2 229.359 1860.03 187.998 2038C156.735 2172.52 105.539 2243.9 105.998 2382C106.451 2518.2 186.877 2488.64 202 2624"/>
            </svg>
          </div>
        </div>
        <section className='ex-1'>
          <div className='what-img-box'>
            <img src={what1} alt="" />
            <img src={whatT1} alt="" />
          </div>
          <div className='what-text-ex'>
            <em>카페가 눈치 보일 땐?</em>
            <p>가까운 청년공간에서<br/>공부해 보세요!</p>
            <a href='/youthspacelist/1'>더 알아보기</a>
          </div>
          
        </section>
        <section className='ex-2'>
          <div className='what-text-ex'>
            <em>모여YOUNG만의 단체톡</em>
            <p>청년TALK에서<br/>함께해요</p>
            <a href='/ws-chat'>더 알아보기</a>
          </div>
          <div className='what-img-box'>
            <img src={what2} alt="" />
            <img src={whatT2} alt="" />
          </div>
        </section>
        <section className='ex-3'>
          <div className='what-img-box'>
            <img src={what3} alt="" />
            <img src={whatT3} alt="" />
          </div>
          <div className='what-text-ex'>
            <em>없는것 빼고 다 있는 모임!</em>
            <p>당신의 취미, 공부<br/>함께 해요 모여영 에서!</p>
            <a href='/roomlist/1'>더 알아보기</a>
          </div>
        </section>
        <div className='end-img'>
          <em>모여YOUNG에서</em>
          <h4>모여YOUNG!</h4>
          <img src={what4} alt="" />
        </div>
      </div>
      <div className='what-box'></div>
    </div>
    
  );
}

export default WhatYouth;

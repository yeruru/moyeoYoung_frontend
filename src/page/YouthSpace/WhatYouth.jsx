import React, { Component } from 'react';
import { motion } from 'framer-motion';
import './WhatYouth.css';

export default class WhatYouth extends Component {
  constructor(props) {
    super(props);
    this.imgRefs = [React.createRef(), React.createRef(), React.createRef()];
    this.observer = null;
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      this.handleIntersection,
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // content 영역이 화면에 20% 이상 보일 때 콜백 함수 호출
      }
    );

    this.imgRefs.forEach(ref => {
      if (ref.current) {
        this.observer.observe(ref.current);
      }
    });
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  handleIntersection = (entries) => {
    let count = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetRef = entry.target;
        targetRef.style.opacity = 1;
        targetRef.style.transform = 'translateX(0)';
        targetRef.style.transitionDelay = `${count * 0.2}s`;
        count++;
      }
    });
  }

  render() {
    return (
      <div className="what wrap">
        <div className='h'></div>
        <div className="content">
          <div className="title">
            <p>이건 타이틀 입니다.</p>
          </div>
          <div className="imgBox">
            <motion.div ref={this.imgRefs[0]} className="img img1">
              이건 이미지 1
            </motion.div>
            <motion.div ref={this.imgRefs[1]} className="img img2">
              이건 이미지 2
            </motion.div>
            <motion.div ref={this.imgRefs[2]} className="img img3">
              이건 이미지 3
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
}

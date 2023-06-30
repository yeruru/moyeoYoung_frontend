import React, { Component } from 'react'
import './Dashboard.css';


export default class Dashboard extends Component {
  render() {
    return (
      <>
        <div className='room-box'>
          <div className='dash-title'>
            <h2>소개글</h2>
            <p>안녕하세요 이모임은 이예림과 함께하는 어쩌구 입니다 Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, excepturi inventore sapiente assumenda, quibusdam esse est numquam quo sequi corporis aspernatur ullam deserunt itaque amet repellendus, deleniti atque doloribus. Exercitationem.</p>
          </div>
          <div className='todo'>
            <h2>모임 TO DO LIST</h2>
          </div>
        </div>
      </>
    )
  }
}

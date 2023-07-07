import React, { Component } from 'react'
import './Dashboard.css';


function Dashboard({room}){
    return (
      <>
        <div className='room-box'>
          <div className='dash-title'>
            <h2>소개글</h2>
            <p>{room.roomContent}</p>
          </div>
          <div className='todo'>
            <h2>모임 TO DO LIST</h2>
          </div>
        </div>
      </>
    )
}
export default Dashboard;

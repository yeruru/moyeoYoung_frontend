import React, { Component } from 'react'
import './Dashboard.css';
import TodoApp from './Todo/TodoApp';

function Dashboard({roomId, room, state, roomstate}){
  console.log(state);
  console.log(roomstate);
    return (
      
      <>
        <div className='room-box'>
          <div className='dash-title'>
            <h2>소개글</h2>
            <p>{room.roomContent}</p>
          </div>
          {
            (state === 'okMember' || roomstate === 'open') &&
            <>
            <h2>모임 TO DO LIST</h2><br/>
            <div className='todo'>
              <TodoApp roomId={roomId} state={state}/>
            </div>
            </>
          }
        </div>
      </>
    )
}
export default Dashboard;

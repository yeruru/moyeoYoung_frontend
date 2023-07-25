import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Chat.css';
import axios from 'axios';

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  const ws = useRef(null);
  const location = useLocation();
  const roomId = location.pathname.split("/")[2];
  const accessToken = localStorage.getItem("accessToken");
  const [profile, setProfile] = useState();

  useEffect(() => {
    // 유저 정보 가져오기
    axios
      .get("http://localhost:8090/member/mypage", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfile(res.data.fileName);
        setName(res.data.nickname);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(name);
  let prevName = '';

  const msgBox = chatt.map((item, idx) => {
    // 이전 메시지와 다른 사용자이거나, 현재 메시지가 배열의 첫 번째 메시지인 경우에만 이름 표시
    const shouldShowName = idx === 0 || item.name !== prevName;
    prevName = item.name; // 현재 이름을 이전 이름으로 저장

    return (
      <div key={idx} className={item.name === name ? 'me' : 'other'}>
        <div className='messagecontent'>
          <div className='messagebox2'>
            <span className='messageDate'>{item.date}</span>
          </div>
          <div>
            {item.name !== name && (
              <div className='nickname' style={{ fontSize: '10.5px' }}>{item.name}</div>
            )}
            <div className='messagebox'>
              <span className='message'>{item.msg}</span>
            </div>
          </div>

          {item.name !== name && (
            <div className='profilePicture'>
              <img src={`http://localhost:8090/feed/feedimg/${item.profile}`} alt='Profile' style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "block",
                objectFit: 'cover',
                marginLeft: '10px'
              }} />
            </div>
          )}
        </div>
      </div>
    );
  });

  useEffect(() => {
    if (socketData !== undefined) {
      console.log(socketData);
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  //webSocket
  useEffect(() => {
    webSocketLogin();
  }, []);

  const onText = event => {
    console.log(event.target.value);
    setMsg(event.target.value);
  }

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket(`ws://localhost:8090/chat/${roomId}`);

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    }
  });

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      setChkLog(true);
    }
    const currentTime = new Date();

    const hour = currentTime.getHours();
    let minute = currentTime.getMinutes();

    let amPm = "오전";
    let hour12 = hour;

    if (hour12 >= 12) {
      amPm = "오후";
      hour12 -= 12;
    }
    hour12 = hour12 < 10 ? "0" + hour12 : hour12;
    minute = minute < 10 ? "0" + minute : minute;

    if (msg !== '') {
      const data = {
        name,
        msg,
        date: amPm + " " + hour12 + ":" + minute,
        profile,
        // memberId : 
      };
      const temp = JSON.stringify(data);
      if (ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          ws.current.send(temp);
        }
      } else {
        ws.current.send(temp);
      }
    } else {
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");

    setTimeout(() => {
      const list = document.getElementById('msgBox');
      list.scrollTop = list.scrollHeight;
    }, 100);
  });

  return (
    <>
      <div className='Chatroom'>
        <div className='chatroom' id="chat-wrap">
          <div className="chatTalk" id='chatt'>
            <div id='talk' className='talk'>
              <div className='talk-shadow'></div>
              <div className='msgBox' id='msgBox'>
                {msgBox}
              </div>
            </div>
            <input
              className="chatInput"
              disabled={chkLog}
              placeholder='이름을 입력하세요.'
              type='text'
              id='name'
              value={name}
              onChange={(event => setName(event.target.value))}
              style={{ display: 'none' }}
            />
          </div>
          <div className='sendZone' id='sendZone'>
            <div style={{ width: '100%', display: 'flex' }}>
              <input
                id='msg'
                className="chatcontent"
                value={msg}
                onChange={onText}
                onKeyDown={(ev) => { if (ev.keyCode === 13) { send(); } }}
                maxLength="50"
                rows="1"
                spellCheck="false"
              />
              <input
                type='button'
                className='submitbutton'
                value='전송'
                id='btnSend'
                onClick={send}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

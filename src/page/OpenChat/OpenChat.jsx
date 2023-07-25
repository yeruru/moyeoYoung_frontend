// React 및 필요한 라이브러리들을 불러옵니다.
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './OpenChat.css'; // 스타일 파일을 불러옵니다.
import GifSearch from './GifSearch';
import Modal from 'react-modal';

let stompClient;
let ipmod = 1 ? 'http://localhost:8090/ws-chat' : 'http://211.108.241.185:8090/ws-chat'


//react-modal 라이브러리는 모달이 열렸을 때 스크린 리더가 주요 컨텐츠를 인식하지 못하도록 하는 기능을 제공합니다. 
//이렇게 하려면 setAppElement 메소드를 사용하여 애플리케이션의 루트 엘리먼트를 지정해야 합니다.
Modal.setAppElement('#root');

// 채팅 컴포넌트입니다.
const OpenChat = () => {
    // 상태(State) 설정합니다.
    const [msg, setMsg] = useState([]); // 메시지
    const [typedMsg, setTypedMsg] = useState(""); // 사용자가 입력하는 메시지
    const [username, setUsername] = useState(""); // 사용자 이름
    const [profileImage, setProfileImage] = useState(""); // 프로필 이미지
    const [isUserSet, setIsUserSet] = useState(false); // 사용자 설정 여부
    const [room, setRoom] = useState("room1"); // 현재 방

    // 컴포넌트가 마운트되거나 'room' 상태가 변경될 때 연결합니다.
    useEffect(() => {
        connect();

        // 컴포넌트가 언마운트될 때 연결을 해제합니다.
        return () => {
            disconnect();
        }
    }, [room]);


    // 웹소켓 서버에 연결합니다.
    const connect = () => {
        const socket = new SockJS(ipmod);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    // 연결을 해제합니다.
    const disconnect = () => {
        if (stompClient) {
            stompClient.disconnect();
        }
    };

    // 연결이 성공하면 방에 구독합니다.
    const onConnected = () => {
        stompClient.subscribe(`/topic/${room}`, onMessageReceived);
        if(isUserSet){
        sendSysMessage(` < ${username} > 님이 입장하셨습니다.`);  // 입장 공지메시지 전송
        }
    };

    // 연결에 실패하면 오류를 출력합니다.
    const onError = (error) => {
        console.log("Could not connect. " + error);
    };

    // URL 검사 및 변환 함수
    const processUrl = (url) => {
        const isImageUrl = url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
        if (!isImageUrl && (url.startsWith('http://') || url.startsWith('https://'))) {
        return `<a href="${url}" target="_blank">${url}</a>`;
        }
        return url;
    };
    
    // 메시지를 받으면 상태를 업데이트합니다.
    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
    
        // URL이 포함된 메시지의 경우, URL을 하이퍼링크로 변환합니다.
        if (message.text) {
        message.text = processUrl(message.text);
        }
    
        setMsg((msg) => [...msg, message]);
    
        // 새 메시지가 오면 스크롤을 맨 아래로 내립니다.
        setTimeout(() => {
        const chatContainer = document.querySelector(".chat-message-list");
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
        }, 0);
    };
  
    // 메시지를 전송합니다.
    const sendMessage = (event) => {
        // event 객체가 있으면 기본 submit 행동을 막습니다.
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const messageToSend = event && event.typedMsg ? event.typedMsg : typedMsg;

        // messageToSend가 이미지 URL인지 확인합니다.
        const isImageUrl = messageToSend.match(/\.(jpeg|jpg|gif|png)$/) !== null;

        let processedMessageToSend = processUrl(messageToSend);

        if (messageToSend !== "") {
            stompClient.send(
                `/app/chat/${room}/sendMessage`,
                {},
                JSON.stringify({ 
                    msgFrom: username, 
                    text: isImageUrl ? null : processedMessageToSend, 
                    image: isImageUrl ? messageToSend : null, 
                    profileImage: profileImage
                })
            );
        }

        // If event.typedMsg exists, we assume the message was sent from the gif modal
        // so we do not reset the input field in that case.
        if (!(event && event.typedMsg)) {
            setTypedMsg("");
        }
    };

    
    
    // 방을 변경합니다.
    const handleRoomChange = (newRoom) => {
        if (newRoom !== room){
            setRoom(newRoom);
            setMsg([]);
        }
    };

    // 공지 메시지를 전송합니다.
    const sendSysMessage = (message) => {
        stompClient.send(`/app/chat/${room}/sendMessage`, {}, JSON.stringify({ msgFrom: "", text: message, profileImage: "/image/openchat/white.png" }));
    }

    //gif관련 및 모달관련
    const [isModalOpen, setModalOpen] = useState(false);

    const handleGifButtonClick = () => {
        setModalOpen(true);
      };
      
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // 이미지 선택 핸들러를 수정합니다.
    const handleImageClick = (imageUrl) => {
        sendMessage({ typedMsg: imageUrl });
        handleCloseModal();
    };
    
    //gif관련 모달 스타일정의
    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#2f3136',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            maxWidth: '600px',
            padding: '20px',
            zIndex: '10000',
        },
    };
    
    // 모달 버튼 스타일정의
    const buttonStyles = {
        backgroundColor: '#7289da',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '8px', // Button 모서리 둥글게
    };
      
    const handleClickChat = async () => {
        const accessToken = localStorage.getItem('accessToken');
        const memberInfo = await fetchMemberInfo(accessToken);
        if (memberInfo === null) {
            alert('로그인이 필요합니다!');
            return;
        }
        console.log("여기에출력",memberInfo.username);
        setUsername(memberInfo.nickname);

        sendSysMessage(` < ${memberInfo.nickname} > 님이 입장하셨습니다.`);  // 입장 공지메시지 전송
        setIsUserSet(true);
      };
    

    
      async function fetchMemberInfo(token) {
        try {
            console.log("시도중");
            // Provide full URL to the endpoint
            const response = await fetch('http://localhost:8090/member/mypage', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Response not OK');
            }
    
            const text = await response.text();
            // Now attempt to parse it as JSON
            const data = JSON.parse(text);
            console.log(text);
            console.log(data);

    
            return data;
        } catch (error) {
            console.error('Error fetching member info:', error);
            return null;
        }
    }
    
    // JSX를 반환합니다.
    return (
        <div className='wrap'>
            <img src="/image/openchat/청년talk_배너.png" style={{ width: '400px', display: 'block', margin: '0 auto' }} />
            <div className="chat-container">
                <div className="chat-room-buttons">
                    <button className="menu-button" onClick={() => handleRoomChange("room1")}>청년공간 같이가실분</button>
                    <button className="menu-button" onClick={() => handleRoomChange("room2")}>모임 같이 하실분</button>
                    <button className="menu-button" onClick={() => handleRoomChange("room3")}>자유TALK</button>
                </div>

                {!isUserSet ?
                    <button id='myButton' onClick={handleClickChat}>접속하기</button>
                    :
                    <>
                        {/* 메세지 리스트 렌더링 */}
                        <div className="chat-message-list">
                        {msg.map((message, i) =>
                            <div 
                                key={i} 
                                className={`chat-message ${message.msgFrom === username ? 'own-message' : 'other-message'} ${message.msgFrom !== username && (i === 0 || msg[i-1].msgFrom !== message.msgFrom) ? 'first-in-sequence' : ''}`}
                            >
                                {(i === 0 || msg[i-1].msgFrom !== message.msgFrom) && message.msgFrom !== username && (
                                    <img src={message.profileImage} alt="profile" className="profile-pic"/>
                                )}
                                <div className={`message-box ${message.msgFrom === username ? 'own-message-box' : 'other-message-box'}`}>
                                    {(i === 0 || msg[i-1].msgFrom !== message.msgFrom) && <span className="username">{message.msgFrom}</span>}
                                    <div className={`message-content ${message.msgFrom === username ? 'own-message-content' : 'other-message-content'}`}>
                                        {message.image ? <img src={message.image} alt="content" className="limited-image" /> :
                                        <span dangerouslySetInnerHTML={{__html: message.text}} />}
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                        {/* 종료 // 메세지 리스트 렌더링 */}
                
                        {/* 채팅입력 폼 컨테이너 */}
                        <form onSubmit={sendMessage} className="message-form">
                            <div>
                                <button onClick={handleGifButtonClick} style={{marginRight : "5px"}}>GIF 선택</button>
                                <Modal 
                                isOpen={isModalOpen} 
                                onRequestClose={handleCloseModal}
                                style={customStyles}
                                contentLabel="Gif Search Modal"
                                >
                                <GifSearch onImageClick={handleImageClick} />
                                <button onClick={handleCloseModal} style={buttonStyles}>닫기</button>
                                </Modal>
                            </div>
                            {/* 채팅 텍스트 입력칸 */}
                            <textarea
                                rows="1"
                                value={typedMsg}
                                style={{ maxHeight: "100px", overflow: "auto"  }} /* 추가된 부분 */
                                onChange={(event) => {
                                    event.target.style.height = 'auto';
                                    event.target.style.height = event.target.scrollHeight > 100 ? '100px' : event.target.scrollHeight + -18 + 'px';
                                    setTypedMsg(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    if (event.isComposing || event.keyCode === 229) {
                                        return;
                                    }
                                    if (event.key === 'Enter' && event.shiftKey) {
                                        event.preventDefault();
                                        setTypedMsg(typedMsg + '\n');
                                        event.target.style.height = event.target.scrollHeight > 100 ? '100px' : event.target.scrollHeight + 'px';
                                    } else if (event.key === 'Enter') {
                                        event.preventDefault();
                                        sendMessage(event);
                                        event.target.style.height = "auto";
                                    }
                                }}
                            />


                            {/* 종료 /// 채팅 텍스트 입력칸 */}
                            <button type="submit">전송</button>
                        </form>
                        {/* 종료 /// 채팅입력 폼 컨테이너 */}
                    </>
                }
            </div>
        </div>
    )
};

export default OpenChat; // OpenChat 컴포넌트를 내보냅니다.
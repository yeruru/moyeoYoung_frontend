import React, {  useEffect, useState } from 'react';
import './Note.css';
import usePagination from '@mui/material/usePagination';
import { Pagination} from '@mui/material';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import NoteMenu from './NoteMenu';
import axios from 'axios';

function NoteForm() {
  // 글자 수 제한
  const [characterCount, setCharacterCount] = useState(0);
  const [nickname, setNickname] = useState("");
  const maxCharacterCount = 300;
  const handleTextareaChange = (event) => {
    const text = event.target.value;
    const currentCharacterCount = text.length;
    // const name = event.target.name;
    // const value = event.target.value;
    // setNote({...note, [name]:value})
    change(event);
    // 300자를 초과하여 입력한 경우, 입력이 더 이상 되지 않도록 제한합니다.
    if (currentCharacterCount <= maxCharacterCount) {
      setCharacterCount(currentCharacterCount);
    } else {
      setCharacterCount(maxCharacterCount);
      event.target.value = text.slice(0, maxCharacterCount);
    }
  };
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const { receiverNickname } = location.state;
  useEffect(()=>{
    setNickname(location.pathname.split("/")[2]);
  },[location]);
 
  // const receivedNickname = useState("");
  // const content = useState("");
  const [note, setNote] = useState({
    receiverNickname: "",
    content: "",
  });

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({...note, [name]:value})  
};

  const handleSend = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("receiverNickname", note.receiverNickname);
    formData.append("content", note.content);
    axios
      .post("http://localhost:8090/note/send", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/sendnote");
      })
      .catch((error) => {
        console.log(error.data);
        console.error(error);
        alert("보내는 사람 닉네임을 정확하게 입력해주세요!");
        document.location.href = "/noteform";
      });
  };

  return (
    <div
      className="wrap"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "85px",
      }}
    >
      <NoteMenu />
      <div className="note">
        <div className="note-flex">
          <div>
            <h3 className="note-title">쪽지쓰기</h3>
            <div className="send-window">
              <div className="send-area">
                <span>받는사람</span>
                {
                  nickname != '' &&
                  <input type="text" maxLength={20} name= "receiverNickname" onChange={change} value={nickname} className='note-email' id='note-email'/>
                }
                {
                  nickname == '' &&
                   <input type="text" maxLength={20} name= "receiverNickname" onChange={change} placeholder='보내는 사람의 닉네임을 입력해 주세요.' className='note-email'  id='note-email'/>
                }
               
                <button type='button' className='send-btn' onClick={handleSend}>보내기</button>
              </div>
              <div className="writing-area">
                <textarea
                  name="content"
                  id=""
                  cols="5"
                  rows="55"
                  title="쪽지 내용을 입력해 주세요."
                  style={{ resize: "none" }}
                  onChange={handleTextareaChange}
                ></textarea>
              </div>
              <div className="character">
                <span>{characterCount}</span>/<span>{maxCharacterCount}</span>자
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;

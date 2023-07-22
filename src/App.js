import "./App.css";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";
import RoomList from "./page/OpenRoom/RoomList";
import MakeRoom from "./page/OpenRoom/MakeRoom";

import { SettingRoom } from "./page/OpenRoom/SettingRoom";

import Header from "./page/Main/Header";
import Main from "./page/Main/Main"; 
import Footer from "./page/Main/Footer";
import WhatYouth from "./page/YouthSpace/WhatYouth"; 

import { YouthSpaceList } from "./page/YouthSpace/YouthSpaceList";
import { YouthSpaceDetail } from "./page/YouthSpace/YouthSpaceDetail"; 

import Login from "./page/Login/Login";
import SignUp from "./page/Login/SignUp";

// 마이페이지
import MypageMain from "./page/MyPage/MypageMain";
import MyBookmark from "./page/MyPage/myactivity/MyBookmark";
import MyFeed from "./page/MyPage/myactivity/MyFeed";
import MyRoom from "./page/MyPage/myactivity/MyRoom";
import MyJoinRoom from "./page/MyPage/myactivity/MyJoinRoom"

import ScrollToTop from "./page/Main/ScrollToTop";

// 쪽지
import Note from "./page/Note/Note";
import UserPage from "./page/UserPage/UserPage";
import OpenChat from "./page/OpenChat/OpenChat";

import Chat from "./page/Chat/Chat";
import SendNote from "./page/Note/SendNote";
import NoteForm from "./page/Note/NoteForm";
import DetailReceive from "./page/Note/DetailReceive";
import DetailSend from "./page/Note/DetailSend";

function App() {
  return (
    <>
      <Header/> 
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/whatyouth" element={<WhatYouth />} />
        <Route exact path="/youthspacelist/:page" element={<YouthSpaceList/>}/>
        <Route exact path="/roomlist/:page" element={<RoomList/>}/>
        <Route exact path="/makeroom" element={<MakeRoom/>}/>
        {/* <Route path="/settingroom" element={<SettingRoom/>}/> */}
        <Route exact path="/settingroom/:roomId" element={<SettingRoom/>}/>
        <Route exact path="/chat/:roomId" element={<Chat/>}/>
        <Route exact path="/roomMain/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/dashboard/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/roomFeed/:roomId" element={<RoomMain />} />

        {/* 모임방 공지사항 */}
        <Route  path="/roomMain/roomAnno/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/writeAnno/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/:roomId/detailAnno/:annoId" element={<RoomMain />} />
        <Route  path="/roomMain/:roomId/editAnno/:annoId" element={<RoomMain />} />

        <Route  path="/roomMain/writefeed/:roomId" element={<RoomMain />} />

        <Route exact path="/" element={<Main />} />
        <Route  path="/roomMain/modifyfeed/:roomId" element={<RoomMain />} />

          
        <Route exact path="/" element={<Main />}/>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        {/* 마이페이지 */}
        <Route exact path="/mypagemain" element={<MypageMain />} />
        <Route exact path="/myroom" element={<MyRoom />} />
        <Route exact path="/myjoinroom" element={<MyJoinRoom />} />
        <Route exact path="/myfeed" element={<MyFeed />} />
        <Route exact path="/mybookmark" element={<MyBookmark />} />
        
        
        
        

        <Route path="/roomMain/*" element={<RoomMain />} />
        <Route exact path="/youthspacedetail/:spaceId" element={<YouthSpaceDetail/>}/>
        {/* <Route exact path="/youthspacedetail:spaceid" element={<MakeRoom/>}/> */}
        <Route exact path="/note" element={<Note />} />
        <Route exact path="/sendnote" element={<SendNote />} />
        <Route exact path="/noteform" element={<NoteForm />} />
        <Route exact path="/note/receive/:noteId" element={<DetailReceive />} />
        <Route exact path="/note/send/:noteId" element={<DetailSend />} />

        <Route exact path="/userpage" element={<UserPage />} />

        
        <Route exact path="/ws-chat" element={<OpenChat />} />


      </Routes>
      <ScrollToTop />
      <Footer/>
    </>
  );
}

export default App;

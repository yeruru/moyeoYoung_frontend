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
import MyPage from "./page/MyPage/MyPage"; 

import ScrollToTop from "./page/Main/ScrollToTop";

// 쪽지
import Note from "./page/Note/Note";
import UserPage from "./page/UserPage/UserPage";

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
        <Route exact path="/roomMain/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/dashboard/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/roomFeed/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/roomAnno/:roomId" element={<RoomMain />} />
        <Route  path="/roomMain/writefeed/:roomId" element={<RoomMain />} />

        <Route exact path="/" element={<Main />} />
        <Route  path="/roomMain/modifyfeed/:roomId" element={<RoomMain />} />

          
        <Route exact path="/" element={<Main />}/>

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mypage" element={<MyPage />} />

        <Route path="/roomMain/*" element={<RoomMain />} />
        <Route exact path="/youthspacedetail/:spaceId" element={<YouthSpaceDetail/>}/>
        {/* <Route exact path="/youthspacedetail:spaceid" element={<MakeRoom/>}/> */}
        <Route exact path="/note" element={<Note />} />
        <Route exact path="/userpage" element={<UserPage />} />

      </Routes>
      <ScrollToTop />
      <Footer/>
    </>
  );
}

export default App;

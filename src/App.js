import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";
import RoomPlay from "./page/Room/RoomPlay";
import RoomFeed from "./page/Room/RoomContent/Feed/RoomFeed";
import RoomAnno from "./page/Room/RoomContent/Announcements/RoomAnno";

import RoomList from "./page/MyPage/OpenRoom/RoomList";
import MakeRoom from "./page/MyPage/OpenRoom/MakeRoom";
import { YouthSpaceList } from "./page/YouthSpace/YouthSpaceList";

import Header from "./page/Main/Header";
import Main from "./page/Main/Main";
import Login from "./page/Login/Login";
import SignUp from "./page/Login/SignUp";
import MyPage from "./page/MyPage/MyPage";




function App() {
  return (
    <Router>
      <Header/> 
      <Routes>

        <Route exact path="/youthspacelist" element={<YouthSpaceList/>}/>
        <Route exact path="/makeroom" element={<MakeRoom/>}/>
        <Route exact path="/roomlist" element={<RoomList/>}/>

        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/mypage" element={<MyPage />} />
        

        <Route path="/roomMain/*" element={<RoomMain />} />
      </Routes>
    </Router>
  );
}

export default App;

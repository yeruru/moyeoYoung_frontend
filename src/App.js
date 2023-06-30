import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";
import RoomPlay from "./page/Room/RoomPlay";
import RoomFeed from "./page/Room/RoomContent/Feed/RoomFeed";
import RoomAnno from "./page/Room/RoomContent/Announcements/RoomAnno";

import RoomList from "./page/OpenRoom/RoomList";
import MakeRoom from "./page/OpenRoom/MakeRoom";
import { YouthSpaceList } from "./page/YouthSpace/YouthSpaceList";

import Header from "./page/Main/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Main/Footer";



function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/youthspacelist" element={<YouthSpaceList/>}/>
        <Route exact path="/makeroom" element={<MakeRoom/>}/>
        <Route exact path="/roomlist" element={<RoomList/>}/>
        <Route exact path="/" element={<Main />} />
        <Route path="/roomMain/*" element={<RoomMain />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

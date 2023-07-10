import "./App.css";
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";

import RoomList from "./page/OpenRoom/RoomList";
import MakeRoom from "./page/OpenRoom/MakeRoom";
import { YouthSpaceList } from "./page/YouthSpace/YouthSpaceList";

import Header from "./page/Main/Header";
import Main from "./page/Main/Main";
import Footer from "./page/Main/Footer";
import WhatYouth from "./page/YouthSpace/WhatYouth";

// 쪽지
import Note from "./page/Note/Note";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/whatyouth" element={<WhatYouth />} />
        <Route exact path="/youthspacelist" element={<YouthSpaceList/>}/>
        <Route exact path="/makeroom" element={<MakeRoom/>}/>
        <Route exact path="/roomlist" element={<RoomList/>}/>
        <Route path="/roomMain/*" element={<RoomMain />} />
        <Route exact path="/note" element={<Note />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

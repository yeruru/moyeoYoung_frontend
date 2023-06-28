import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";
import RoomPlay from "./page/Room/RoomPlay";
import RoomFeed from "./page/Room/RoomContent/Feed/RoomFeed";
import RoomAnno from "./page/Room/RoomContent/Announcements/RoomAnno";
import RoomList from "./page/OpenRoom/RoomList";
import MakeRoom from "./page/OpenRoom/MakeRoom";
import { YouthSpaceList } from "./page/YouthSpace/YouthSpaceList";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/youthspacelist" element={<YouthSpaceList/>}/>
        <Route exact path="/makeroom" element={<MakeRoom/>}/>
        <Route exact path="/roomlist" element={<RoomList/>}/>
        <Route path="/roomMain/*" element={<RoomMain />} />
      </Routes>
    </Router>
  );
}

export default App;

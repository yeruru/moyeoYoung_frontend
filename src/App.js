import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomMain from "./page/Room/RoomMain";
import RoomPlay from "./page/Room/RoomPlay";
import RoomFeed from "./page/Room/RoomContent/Feed/RoomFeed";
import RoomAnno from "./page/Room/RoomContent/Announcements/RoomAnno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/roomMain/*" element={<RoomMain />} />
      </Routes>
    </Router>
  );
}

export default App;

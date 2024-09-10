import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import Timer from "./components/Timer/Timer";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/stopwatch" element={<Stopwatch/>} />
        <Route path="/timer" element={<Timer/>} />
      </Routes>
    </div>
  );
}

export default App;

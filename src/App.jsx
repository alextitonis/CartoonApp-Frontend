import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Generator from "./Generator";
import Landing from "./landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Generator />} />
      </Routes>
    </Router>
  );
}

export default App;

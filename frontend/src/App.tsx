import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./components/Main";
import Invalid from "./components/Invalid";

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/:slideId' element={<Main />} />
        <Route path="*" element={<Invalid />} />
      </Routes>
    </Router>
  );
}

export default App;
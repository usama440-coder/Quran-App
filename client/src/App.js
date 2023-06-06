import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dasboard";
import Students from "./pages/students/students";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/students" element={<Students />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

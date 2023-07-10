import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dasboard";
import Students from "./pages/students/students";
import Teachers from "./pages/teachers/teachers";
import Courses from "./pages/courses/courses";
import Fee from "./pages/fee/fee";
import Login from "./pages/login/login";
import Layout from "./components/Layout";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Student from "./pages/student/student";

const theme = createTheme({
  palette: {
    primary: {
      main: "#178082",
      dark: "#4CA6A8",
      light: "#62B1B3",
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h5: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 500,
      color: "#178082",
    },
    h6: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 400,
      color: "#178082",
    },
  },
});

function App() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          {isLogged ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/fee" element={<Fee />} />
                <Route path="/student/:id" element={<Student />} />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

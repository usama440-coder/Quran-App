import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dasboard";
import Students from "./pages/students/students";
import Teachers from "./pages/teachers/teachers";
import Courses from "./pages/courses/courses";
import Fee from "./pages/fee/fee";
import Login from "./pages/login/login";
import Layout from "./components/Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Student from "./pages/student/student";
import Teacher from "./pages/teacher/teacher";
import Protected from "./components/Protected";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/students"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Students />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/teachers"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Teachers />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/courses"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Courses />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/fee"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Fee />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/student/:id"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Student />
                  </Layout>
                </Protected>
              }
            />
            <Route
              path="/teacher/:id"
              element={
                <Protected redirectedPath={"/login"}>
                  <Layout>
                    <Teacher />
                  </Layout>
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

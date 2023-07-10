import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import studentService from "../../services/studentService";
import teacherService from "../../services/teacherService";
import courseService from "../../services/courseService";

const tableStyle = {
  paddingRight: "50px",
};

const Student = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});
  const [teacher, setTeacher] = useState({});
  const [course, setCourse] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await studentService.getStudent(id);
        const teacher = await teacherService.getTeacher(
          res?.data?.student?.teacher
        );
        const course = await courseService.getCourse(
          res?.data?.student?.course
        );
        setStudent(res?.data?.student || {});
        setTeacher(teacher?.data?.teacher || {});
        setCourse(course?.data?.course || {});
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">{student?.name}</Typography>
        <Button variant="outlined" onClick={() => navigate("/students")}>
          Back
        </Button>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <Paper sx={{ p: 2 }}>
            <table>
              <tbody>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Email:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {student?.email}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Contact 1:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {student?.contactOne}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Contact 2:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {student?.contactTwo}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Country:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {student?.country}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Fee:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">{student?.fee}</Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Course:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">{course?.name}</Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Teacher:</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">{teacher?.name}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Student;

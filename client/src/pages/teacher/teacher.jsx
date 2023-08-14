import { Box, Button, Container, Paper, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import teacherService from "../../services/teacherService";
import { useSelector } from "react-redux";

const tableStyle = {
  paddingRight: "50px",
};

const Teacher = () => {
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({});
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.admin.token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await teacherService.getTeacher(id, token);
        setTeacher(res?.data?.teacher || {});
        setStudents(res?.data?.students || []);
        setTotalStudents(res?.data?.totalStudents || 0);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, token]);

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
        <Typography variant="h5">{teacher?.name}</Typography>
        <Button variant="outlined" onClick={() => navigate("/teachers")}>
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
                      {teacher?.email}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Contact</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {teacher?.contact}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Salary</Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">
                      {teacher?.salary}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td style={tableStyle}>
                    <Typography variant="subtitle1">Students: </Typography>
                  </td>
                  <td>
                    <Typography variant="subtitle2">{totalStudents}</Typography>
                  </td>
                </tr>
              </tbody>
            </table>
            <Typography sx={{ mt: 5 }} variant="h6">
              Students
            </Typography>
            <table>
              <tbody>
                {students?.map((student) => {
                  return (
                    <tr key={student?._id}>
                      <td style={tableStyle}>
                        <Typography
                          sx={{ cursor: "pointer" }}
                          variant="subtitle1"
                          onClick={() => navigate(`/student/${student?._id}`)}
                        >
                          {student?.name}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="subtitle2">
                          {student?.email}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Teacher;

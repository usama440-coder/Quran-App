import {
  Typography,
  Container,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCourse from "../../components/AddCourse";
import CoursesTable from "../../components/CoursesTable";
import courseService from "../../services/courseService";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await courseService.getCourses();
        setCourseData(res?.data?.courses || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <AddCourse
        open={open}
        handleClose={handleClose}
        courseData={courseData}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Courses</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New
        </Button>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : courseData.length === 0 ? (
        <Typography variant="p">No course found</Typography>
      ) : (
        <CoursesTable courseData={courseData} setCourseData={setCourseData} />
      )}
    </Container>
  );
};

export default Courses;

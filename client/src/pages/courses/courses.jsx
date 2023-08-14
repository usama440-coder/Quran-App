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
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";

const Courses = () => {
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(10);
  const token = useSelector((state) => state.auth.admin.token);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await courseService.getCourses(page, rowsPerPage, token);
        setCourseData(res?.data?.courses || []);
        setTotalPages(res?.data?.totalPages || 0);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage, token]);

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
        <>
          <CoursesTable courseData={courseData} setCourseData={setCourseData} />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalPages}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default Courses;

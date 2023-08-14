import StudentsTable from "../../components/StudentsTable";
import { useEffect, useState } from "react";
import AddStudent from "../../components/AddStudent";
import studentService from "../../services/studentService";
import { Box, Button, Container, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
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
        const res = await studentService.getStudents(page, rowsPerPage, token);
        setStudents(res?.data?.students || []);
        setTotalPages(res?.data?.totalPages || 0);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage, token]);

  return (
    <Container maxWidth="lg" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <AddStudent
        open={open}
        handleClose={handleClose}
        studentsData={students}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Students</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New
        </Button>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : students.length === 0 ? (
        <Typography variant="p">No student found</Typography>
      ) : (
        <>
          <StudentsTable students={students} setStudents={setStudents} />
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

export default Students;

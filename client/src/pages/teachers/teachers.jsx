import { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TeachersTable from "../../components/TeachersTable";
import AddTeacher from "../../components/AddTeacher";
import teacherService from "../../services/teacherService";
import TablePagination from "@mui/material/TablePagination";
import { useSelector } from "react-redux";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
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
        const res = await teacherService.getTeachers(page, rowsPerPage, token);
        setTeachersData(res?.data?.teachers || []);
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
      <AddTeacher
        open={open}
        handleClose={handleClose}
        teachersData={teachersData}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Teachers</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New
        </Button>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : teachersData.length === 0 ? (
        <Typography variant="p">No teacher found</Typography>
      ) : (
        <>
          <TeachersTable
            teachersData={teachersData}
            setTeachers={setTeachersData}
          />
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

export default Teachers;

import StudentsTable from "../../components/StudentsTable";
import { useEffect, useState } from "react";
import AddStudent from "../../components/AddStudent";
import studentService from "../../services/studentService";
import { Box, Button, Container, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await studentService.getStudents();
        setStudents(res?.data?.students || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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
        <StudentsTable students={students} setStudents={setStudents} />
      )}
    </Container>
  );
};

export default Students;

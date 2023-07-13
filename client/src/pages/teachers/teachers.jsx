import { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TeachersTable from "../../components/TeachersTable";
import AddTeacher from "../../components/AddTeacher";
import teacherService from "../../services/teacherService";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await teacherService.getTeachers();
        setTeachersData(res?.data?.teachers || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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
        <Typography variant="p">No course found</Typography>
      ) : (
        <TeachersTable
          teachersData={teachersData}
          setTeachers={setTeachersData}
        />
      )}
    </Container>
  );
};

export default Teachers;

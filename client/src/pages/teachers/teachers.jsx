import { Box, Button, Container, Typography } from "@mui/material";
import TeachersTable from "../../components/TeachersTable";
import { useState } from "react";
import AddTeacher from "../../components/AddTeacher";

const Teachers = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <AddTeacher open={open} handleClose={handleClose} />
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
      <TeachersTable />
    </Container>
  );
};

export default Teachers;

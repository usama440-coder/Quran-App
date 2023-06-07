import { Box, Button, Container, Typography } from "@mui/material";
import StudentsTable from "../../components/StudentsTable";
import { useState } from "react";
import AddStudent from "../../components/AddStudent";

const Students = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <AddStudent open={open} handleClose={handleClose} />
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
      <StudentsTable />
    </Container>
  );
};

export default Students;

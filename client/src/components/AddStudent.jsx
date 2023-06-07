import * as React from "react";
import {
  TextField,
  Box,
  Typography,
  Modal,
  Button,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const AddStudent = ({ open, handleClose }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" textAlign="center">
              Add Student
            </Typography>
            <img src="/img/underline.png" alt="text-underline" width={200} />
          </Box>
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Contact"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            sx={{ my: 1 }}
            id="outlined-basic"
            label="Joining"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Teacher"
              fullWidth
            >
              <MenuItem value={"Naeem Akhtar"}>Dr. Naeem Akhtar</MenuItem>
              <MenuItem value={"Irfan Hameed"}>Irfan Hameed</MenuItem>
              <MenuItem value={"Aneela Zameer"}>Dr. Aneela Zameer</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
          </FormControl>
          <Divider />
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddStudent;

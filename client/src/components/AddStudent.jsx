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
  width: 550,
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
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="contactOne"
              label="Contact 1"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="contactTwo"
              label="Contact 2"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="Joining"
              label="Joining"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="Age"
              label="Age"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="Country"
              label="Country"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="Skype"
              label="Skype"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, my: 0.5 }}
            />
          </Box>
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
          <FormControl fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Course"
              fullWidth
            >
              <MenuItem value={"Course 1"}>Course 1</MenuItem>
              <MenuItem value={"Course 2"}>Course 2</MenuItem>
              <MenuItem value={"Course 3"}>Course 3</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
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

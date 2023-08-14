import { useState } from "react";
import { TextField, Box, Typography, Modal, Button } from "@mui/material";
import teacherService from "../services/teacherService";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

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

const AddTeacher = ({ open, handleClose, teachersData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [inputValue, setInputValue] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await teacherService.registerTeacher(inputValue, token);
      enqueueSnackbar("Teacher added successfully", { variant: "success" });
      teachersData.push(res?.data?.teacher);
      setInputValue({});
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Teacher could not be added",
        { variant: "error" }
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal sx={{ overflow: "auto" }} open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" textAlign="center">
              Add Teacher
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
              required
              variant="outlined"
              size="small"
              name="name"
              value={inputValue?.name || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="email"
              label="Email"
              required
              variant="outlined"
              size="small"
              name="email"
              value={inputValue?.email || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="contact"
              label="Contact"
              variant="outlined"
              required
              size="small"
              name="contact"
              value={inputValue?.contact || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="salary"
              label="Salary"
              variant="outlined"
              required
              size="small"
              name="salary"
              type="number"
              value={inputValue?.salary || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>Add</span>}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTeacher;

import { useEffect, useState } from "react";
import { TextField, Box, Typography, Modal, Button } from "@mui/material";
import courseService from "../services/courseService";
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

const EditCourse = ({ open, handleClose, courseData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  useEffect(() => {
    setCourse(courseData?.name);
  }, [courseData]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await courseService.editCourse(courseData?._id, { name: course }, token);
      enqueueSnackbar("Course updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Course could not be updated",
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
              Edit Course
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
              flexDirection: {
                xs: "column",
                sm: "row",
                width: "100%",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="name"
              label="Name"
              required
              variant="outlined"
              size="small"
              name="name"
              value={course || ""}
              onChange={(e) => setCourse(e.target.value)}
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
            {loading ? <span>Loading...</span> : <span>Save</span>}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditCourse;

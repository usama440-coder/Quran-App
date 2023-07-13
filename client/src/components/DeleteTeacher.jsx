import { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import teacherService from "../services/teacherService";

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

const DeleteTeacher = ({ open, handleDelete, teacher, setTeachers }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await teacherService.deleteTeacher(teacher?._id);
      enqueueSnackbar("Teacher deleted successfully", { variant: "success" });
      setTeachers((prev) => prev.filter((data) => data?._id !== teacher?._id));
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Teacher could not be deleted",
        { variant: "error" }
      );
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal sx={{ overflow: "auto" }} open={open} onClose={handleDelete}>
        <Box sx={style}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" textAlign="center">
              Confirm An Action
            </Typography>
            <img src="/img/underline.png" alt="text-underline" width={200} />
          </Box>
          <Typography variant="body1" textAlign="center">
            Do you want to delete this teacher? You will not be able to undo
            this operation. All the subsequent student records belonging to this
            teacher will be deleted.
          </Typography>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>Delete</span>}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteTeacher;

import { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import feeService from "../services/feeService";
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

const DeleteFee = ({ open, handleDelete, fee, setFeeData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await feeService.deleteFee(fee?._id, token);
      enqueueSnackbar("Fee deleted successfully", { variant: "success" });
      setFeeData((prev) => prev.filter((data) => data?._id !== fee?._id));
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Fee could not be deleted",
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
            Do you want to delete this fee? You will not be able to undo this
            operation.
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

export default DeleteFee;

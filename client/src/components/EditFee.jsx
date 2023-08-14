import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Modal,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
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

const EditFee = ({ open, handleClose, feeData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  useEffect(() => {
    setAmount(feeData?.amount);
    setIsPaid(feeData?.isPaid);
  }, [feeData]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await feeService.editFee(feeData?._id, { amount, isPaid }, token);
      enqueueSnackbar("Fee updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Fee could not be updated",
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
              Edit Fee
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
              type="number"
              id="name"
              label="Amount"
              required
              variant="outlined"
              size="small"
              name="name"
              value={amount || ""}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPaid"
                    onChange={(e) => setIsPaid(e.target.checked)}
                    checked={isPaid || false}
                  />
                }
                label="Paid"
              />
            </FormGroup>
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

export default EditFee;

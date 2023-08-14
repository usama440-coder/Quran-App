import { useState } from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import FeeService from "../services/feeService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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

const AddFee = ({ open, handleClose, feeData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [singleStudent, setSingleStudent] = useState(false);
  const [student, setStudent] = useState("");
  const token = useSelector((state) => state.auth.admin.token);

  const handleSingleStudent = (e) => {
    setSingleStudent(e.target.checked);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (singleStudent) {
        await FeeService.addFeeSingleStudent(student, { date }, token);
      } else {
        await FeeService.addFee({ date }, token);
      }

      enqueueSnackbar("Fee added successfully", { variant: "success" });
      setDate("");
      setStudent("");
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Fee could not be added",
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
              Add Fee
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
            <FormGroup sx={{ margin: "auto" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={singleStudent || false}
                    onChange={handleSingleStudent}
                  />
                }
                label="Single student"
              />
            </FormGroup>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) => setDate(value.$d)}
                sx={{ width: "100%" }}
                label={'"month" and "year"'}
                views={["month", "year"]}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>

            {singleStudent && (
              <TextField
                fullWidth
                id="name"
                label="Email"
                required
                variant="outlined"
                size="small"
                name="name"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                sx={{ flexGrow: 1, my: 0.5 }}
              />
            )}
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

export default AddFee;

import { useState } from "react";
import {
  TextField,
  Box,
  Typography,
  Modal,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import { countries } from "../utils/country";

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
  const [country, setCountry] = useState(countries[0]);
  const [inputValue, setInputValue] = useState({});
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Modal sx={{ overflow: "auto" }} open={open} onClose={handleClose}>
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
              name="name"
              value={inputValue?.name || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              size="small"
              name="email"
              value={inputValue?.email || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="contactOne"
              label="Contact 1"
              variant="outlined"
              size="small"
              name="contactOne"
              value={inputValue?.contactOne || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="contactTwo"
              label="Contact 2"
              variant="outlined"
              size="small"
              name="contactTwo"
              value={inputValue?.contactTwo || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              type="number"
              id="Age"
              label="Age"
              variant="outlined"
              size="small"
              name="age"
              value={inputValue?.age || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              id="Skype"
              label="Skype"
              variant="outlined"
              size="small"
              name="skype"
              value={inputValue?.skype || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <Autocomplete
              size="small"
              id="country-select-demo"
              sx={{ flexGrow: 1, my: 0.5 }}
              options={countries}
              value={country}
              name="country"
              onChange={(event, newValue) => {
                setCountry(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  size="small"
                  sx={{ flexGrow: 1 }}
                  {...params}
                  label="Choose a country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Box>
          <FormControl fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Teacher"
              fullWidth
              name="teacher"
              onChange={handleChange}
              value={inputValue?.teacher || ""}
            >
              <MenuItem value={"Naeem Akhtar"}>Dr. Naeem Akhtar</MenuItem>
              <MenuItem value={"Irfan Hameed"}>Irfan Hameed</MenuItem>
              <MenuItem value={"Aneela Zameer"}>Dr. Aneela Zameer</MenuItem>
            </Select>
            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="course-lable"
              id="course-select"
              label="Course"
              fullWidth
              name="course"
              onChange={handleChange}
              value={inputValue?.course || ""}
            >
              <MenuItem value={"Course 1"}>Course 1</MenuItem>
              <MenuItem value={"Course 2"}>Course 2</MenuItem>
              <MenuItem value={"Course 3"}>Course 3</MenuItem>
            </Select>
            <InputLabel id="course-select">Course</InputLabel>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="afterTwelve"
                  onChange={handleChecked}
                  checked={checked}
                />
              }
              label="After 12 AM"
            />
          </FormGroup>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddStudent;

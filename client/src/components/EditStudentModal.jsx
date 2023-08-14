import { useEffect, useState } from "react";
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
import teacherService from "../services/teacherService";
import courseService from "../services/courseService";
import studentService from "../services/studentService";
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

const EditStudent = ({ open, handleClose, student }) => {
  const [country, setCountry] = useState(countries[0]);
  const [inputValue, setInputValue] = useState({});
  const [checked, setChecked] = useState(student?.afterTwelve || false);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector((state) => state.auth.admin.token);

  useEffect(() => {
    setInputValue({
      name: student?.name,
      email: student?.email,
      contactOne: student?.contactOne,
      contactTwo: student?.contactTwo,
      age: student?.age,
      fee: student?.fee,
      skype: student?.skype,
      course: student?.course,
      teacher: student?.teacher,
    });
    setChecked(student?.afterTwelve);

    // get country object
    const getCountry = () => {
      const countryObj = countries.find((item) => {
        return item.label === student?.country;
      });

      setCountry(countryObj);
    };

    const fetchData = async () => {
      try {
        const totalTeachers = await courseService.getCourses(1, 25, token);
        const totalCourses = await courseService.getCourses(1, 25, token);
        const teachersData = await teacherService.getTeachers(
          0,
          totalTeachers?.data?.totalPages,
          token
        );
        const coursesData = await courseService.getCourses(
          0,
          totalCourses?.data?.totalPages,
          token
        );
        setTeachers(teachersData?.data?.teachers || []);
        setCourses(coursesData?.data?.courses || []);
        getCountry();
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [student, token]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await studentService.updateStudent(
        student?._id,
        {
          ...inputValue,
          country: country.label,
          afterTwelve: checked,
        },
        token
      );

      enqueueSnackbar("Student Updated Successfully", { variant: "success" });
      setInputValue({});
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || "Student could not be updated",
        { variant: "error" }
      );
    }
  };

  return (
    <div>
      <Modal sx={{ overflow: "auto" }} open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" textAlign="center">
              Edit Student
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
              required
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
              required
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
              required
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
              required
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
              required
              type="fee"
              id="Fee"
              label="Fee"
              variant="outlined"
              size="small"
              name="fee"
              value={inputValue?.fee || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              required
              fullWidth
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
              required
              size="small"
              id="country-select-demo"
              sx={{ flexGrow: 1, my: 0.5 }}
              options={countries}
              value={country || countries[0]}
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
          <FormControl required fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Teacher"
              fullWidth
              name="teacher"
              onChange={handleChange}
              value={inputValue?.teacher || ""}
            >
              {teachers?.map((teacher) => {
                return (
                  <MenuItem key={teacher?._id} value={teacher?._id}>
                    {teacher?.name}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
          </FormControl>
          <FormControl required fullWidth size="small" sx={{ my: 1 }}>
            <Select
              labelId="course-lable"
              id="course-select"
              label="Course"
              fullWidth
              name="course"
              onChange={handleChange}
              value={inputValue?.course || ""}
            >
              {courses?.map((course) => {
                return (
                  <MenuItem key={course?._id} value={course?._id}>
                    {course?.name}
                  </MenuItem>
                );
              })}
            </Select>
            <InputLabel id="course-select">Course</InputLabel>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              value={checked}
              control={
                <Checkbox
                  name="afterTwelve"
                  onChange={handleChecked}
                  checked={checked || false}
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
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditStudent;

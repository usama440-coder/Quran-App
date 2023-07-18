import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCourse from "./EditCourse";
import DeleteCourse from "./DeleteCourse";
import { useState } from "react";

const CoursesTable = ({ courseData, setCourseData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currCourse, setCurrCourse] = useState({});

  const handleEdit = (course) => {
    setCurrCourse(course);
    setOpenEdit(!openEdit);
  };

  const handleDelete = (course) => {
    setCurrCourse(course);
    setOpenDelete(!openDelete);
  };

  return (
    <TableContainer component={Paper}>
      <EditCourse
        open={openEdit}
        handleClose={handleEdit}
        courseData={currCourse}
      />

      <DeleteCourse
        open={openDelete}
        handleDelete={handleDelete}
        course={currCourse}
        setCourseData={setCourseData}
      />

      <Table sx={{ minWidth: "600px" }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
            }}
          >
            <TableCell sx={{ color: "#ffffff" }}>Name</TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Students
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseData?.map((course) => (
            <TableRow
              key={course?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course?.name?.toUpperCase()}
              </TableCell>
              <TableCell align="right">{course?.numOfStudents}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => handleEdit(course)}>
                  <ModeEditOutlineOutlinedIcon
                    fontSize="small"
                    color="success"
                  />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(course)}>
                  <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoursesTable;

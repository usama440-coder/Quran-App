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
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTeacher from "./EditTeacher";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteTeacher from "./DeleteTeacher";

const TeachersTable = ({ teachersData, setTeachers }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currTeacher, setCurrTeacher] = useState({});
  const navigate = useNavigate();

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenEdit = (teacher) => {
    setCurrTeacher(teacher);
    setOpenEdit(true);
  };

  const handleDelete = (teacher) => {
    setCurrTeacher(teacher);
    setOpenDelete(!openDelete);
  };

  return (
    <TableContainer component={Paper}>
      <EditTeacher
        open={openEdit}
        handleClose={handleCloseEdit}
        teacher={currTeacher}
      />
      <DeleteTeacher
        open={openDelete}
        handleDelete={handleDelete}
        teacher={currTeacher}
        setTeachers={setTeachers}
      />
      <Table sx={{ minWidth: "600px" }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: (theme) => theme.palette.primary.light,
            }}
          >
            <TableCell sx={{ color: "#ffffff" }}>Name</TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Email
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Contact
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Salary
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachersData?.map((teacher) => (
            <TableRow
              key={teacher?.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {teacher?.name}
              </TableCell>
              <TableCell align="right">{teacher?.email}</TableCell>
              <TableCell align="right">{teacher?.contact}</TableCell>
              <TableCell align="right">{teacher?.salary}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => handleOpenEdit(teacher)}
                >
                  <ModeEditOutlineOutlinedIcon
                    fontSize="small"
                    color="success"
                  />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(teacher)}>
                  <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/teacher/${teacher?._id}`)}
                >
                  <VisibilityOutlinedIcon fontSize="small" color="warning" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeachersTable;

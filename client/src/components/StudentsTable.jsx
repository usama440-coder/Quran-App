import { useNavigate } from "react-router-dom";
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

const StudentsTable = ({ students }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "600px" }} aria-label="simple table">
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
              Country
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Fee
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.map((student) => (
            <TableRow
              key={student?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student?.name}
              </TableCell>
              <TableCell align="right">{student?.email}</TableCell>
              <TableCell align="right">{student?.contactOne}</TableCell>
              <TableCell align="right">{student?.country}</TableCell>
              <TableCell align="right">{student?.fee}</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <ModeEditOutlineOutlinedIcon
                    fontSize="small"
                    color="success"
                  />
                </IconButton>
                <IconButton size="small">
                  <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => navigate(`/student/${student?._id}`)}
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

export default StudentsTable;

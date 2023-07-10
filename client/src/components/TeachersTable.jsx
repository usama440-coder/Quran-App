import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const TeachersTable = ({ teachersData }) => {
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
              Salary
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeachersTable;
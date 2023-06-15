import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const createData = (name, email, contact, salary) => {
  return { name, email, contact, salary };
};

const rows = [
  createData("Usman Asad", "usman1@gmail.com", "03404403600", 50000),
  createData("Usman Asad", "usman2@gmail.com", "03404403600", 50000),
  createData("Usman Asad", "usman3@gmail.com", "03404403600", 50000),
  createData("Usman Asad", "usman4@gmail.com", "03404403600", 50000),
];

const TeachersTable = () => {
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
          {rows?.map((row) => (
            <TableRow
              key={row.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.contact}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeachersTable;

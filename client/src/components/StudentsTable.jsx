import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const createData = (name, email, contact, country, joining, teacher) => {
  return { name, email, contact, country, joining, teacher };
};

const rows = [
  createData(
    "Usman Asad",
    "usman1@gmail.com",
    "03404403600",
    "Pakistan",
    "May 13, 2023",
    "Naeem Akhtar"
  ),
  createData(
    "Usman Asad",
    "usman2@gmail.com",
    "03404403600",
    "Pakistan",
    "May 13, 2023",
    "Naeem Akhtar"
  ),
  createData(
    "Usman Asad",
    "usman3@gmail.com",
    "03404403600",
    "Pakistan",
    "May 13, 2023",
    "Naeem Akhtar"
  ),
  createData(
    "Usman Asad",
    "usman4@gmail.com",
    "03404403600",
    "Pakistan",
    "May 13, 2023",
    "Naeem Akhtar"
  ),
  createData(
    "Usman Asad",
    "usman5@gmail.com",
    "03404403600",
    "Pakistan",
    "May 13, 2023",
    "Naeem Akhtar"
  ),
];

const StudentsTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "400px" }} aria-label="simple table">
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
              Joining
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Teacher
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
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.joining}</TableCell>
              <TableCell align="right">{row.teacher}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentsTable;

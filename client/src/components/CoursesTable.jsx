import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CoursesTable = ({ courseData }) => {
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
              Students
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
              <TableCell align="right">{10}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoursesTable;

import {
  Typography,
  Container,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddFee from "../../components/AddFee";
import FeeTable from "../../components/FeeTable";
import FeeService from "../../services/feeService";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

const Fee = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.admin.token);

  // filters
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(10);
  const [email, setEmail] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFee = async () => {
    setLoading(true);

    try {
      const res = await FeeService.getFees(page, rowsPerPage, email, token);
      setTotalPages(res?.data?.totalPages || 0);
      setFeeData(res?.data?.fee || []);
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Student not found", {
        variant: "error",
      });
      setFeeData([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await FeeService.getFees(page, rowsPerPage, "", token);
        setFeeData(res?.data?.fee || []);
        setTotalPages(res?.data?.totalPages || 0);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, rowsPerPage, token]);

  return (
    <Container maxWidth="xl" sx={{ maxWidth: { xs: "400px", sm: "100%" } }}>
      <AddFee open={open} handleClose={handleClose} feeData={setFeeData} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Fee</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          + Add New
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <IconButton aria-label="search" onClick={handleFee}>
          <SearchIcon />
        </IconButton>
      </Box>

      {loading ? (
        <LinearProgress />
      ) : feeData.length === 0 ? (
        <Typography variant="p">No fee found</Typography>
      ) : (
        <>
          <FeeTable feeData={feeData} setFeeData={setFeeData} />
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalPages}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Container>
  );
};

export default Fee;

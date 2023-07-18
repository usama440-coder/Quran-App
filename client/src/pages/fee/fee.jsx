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

const Fee = () => {
  const [loading, setLoading] = useState(false);
  const [feeData, setFeeData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await FeeService.getFees();
        setFeeData(res?.data?.fee || []);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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

      {loading ? (
        <LinearProgress />
      ) : feeData.length === 0 ? (
        <Typography variant="p">No fee found</Typography>
      ) : (
        <FeeTable feeData={feeData} setFeeData={setFeeData} />
      )}
    </Container>
  );
};

export default Fee;

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
import { useState } from "react";
import Chip from "@mui/material/Chip";
import EditFee from "./EditFee";
import DeleteFee from "./DeleteFee";

const FeeTable = ({ feeData, setFeeData }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currFee, setCurrFee] = useState({});

  const format = {
    month: "short",
    year: "numeric",
  };

  const handleEdit = (fee) => {
    setCurrFee(fee);
    setOpenEdit(!openEdit);
  };

  const handleDelete = (fee) => {
    setCurrFee(fee);
    setOpenDelete(!openDelete);
  };

  return (
    <TableContainer component={Paper}>
      <EditFee open={openEdit} handleClose={handleEdit} feeData={currFee} />

      <DeleteFee
        open={openDelete}
        handleDelete={handleDelete}
        fee={currFee}
        setFeeData={setFeeData}
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
              Email
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Month
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Amount
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Status
            </TableCell>
            <TableCell sx={{ color: "#ffffff" }} align="right">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feeData?.map((fee) => (
            <TableRow
              key={fee?._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {fee?.studentName}
              </TableCell>
              <TableCell align="right">{fee?.studentEmail}</TableCell>
              <TableCell align="right">
                {new Date(fee?.date).toLocaleString("en-US", format)}
              </TableCell>
              <TableCell align="right">{fee?.amount}</TableCell>
              <TableCell align="right">
                {fee?.isPaid === true ? (
                  <Chip
                    size="small"
                    label="paid"
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Chip
                    size="small"
                    label="unpaid"
                    color="error"
                    variant="outlined"
                  />
                )}
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => handleEdit(fee)}>
                  <ModeEditOutlineOutlinedIcon
                    fontSize="small"
                    color="success"
                  />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(fee)}>
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

export default FeeTable;

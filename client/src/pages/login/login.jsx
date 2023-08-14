import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../slices/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  py: 5,
  px: 4,
  maxWidth: "300px",
  width: "100%",
};

const imgStyle = {
  width: "400px",
  position: "absolute",
  top: -33,
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(loginAdmin(data))
      .unwrap()
      .then((data) => {
        navigate("/");
        enqueueSnackbar("Logged in successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        enqueueSnackbar(err?.message || "Could not logged in", {
          variant: "error",
        });
      });

    setLoading(false);
  };

  return (
    <>
      {/* <Box sx={{ width: "200px", border: "2px solid red" }}> */}
      <img
        src="/img/lantern-login.png"
        alt="lantern-left"
        style={{ ...imgStyle, left: "0" }}
      />
      <img
        src="/img/lantern-login.png"
        alt="lantern-left"
        style={{ ...imgStyle, right: 0, transform: "scaleX(-1)" }}
      />
      {/* </Box> */}
      <Box>
        <Paper sx={style}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h5" textAlign="center">
              Login
            </Typography>
            <img src="/img/underline.png" alt="text-underline" width={200} />
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              flexWrap: "wrap",
              flexDirection: {
                xs: "column",
                sm: "row",
                width: "100%",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="name"
              type="email"
              label="Email"
              required
              variant="outlined"
              size="small"
              name="email"
              value={data?.email || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
            <TextField
              fullWidth
              id="name"
              type="password"
              label="Password"
              required
              variant="outlined"
              size="small"
              name="password"
              value={data?.password || ""}
              onChange={handleChange}
              sx={{ flexGrow: 1, my: 0.5 }}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>Login</span>}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;

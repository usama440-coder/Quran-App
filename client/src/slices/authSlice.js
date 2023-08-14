import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "../services/adminService";

const initialState = {
  loading: false,
  admin: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : {},

  error: "",
  role: localStorage.getItem("role") ? localStorage.getItem("role") : "admin",
};

export const loginAdmin = createAsyncThunk(
  "admin/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await adminService.login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.loading = false;
      state.admin = {};
      state.error = "";
      localStorage.clear("admin");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state, action) => {
        state.loading = true;
        state.admin = {};
        state.error = "";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.error = "";
        localStorage.setItem("admin", JSON.stringify(state.admin));
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.admin = {};
        state.error = action.payload.message;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
export const { logout } = authSlice.actions;

import http from "../http-common";

const login = (data) => {
  return http.post("/admin/login", data);
};

const adminService = {
  login,
};

export default adminService;

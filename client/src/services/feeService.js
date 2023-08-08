import http from "../http-common";

const addFee = (data) => {
  return http.post("/fee", data);
};

const addFeeSingleStudent = (id, data) => {
  return http.post(`/fee/${id}`, data);
};

const getFees = (page, pageSize, email) => {
  return http.get(`/fee?page=${page}&pageSize=${pageSize}&email=${email}`);
};

const getFee = (id) => {
  return http.get(`/fee/${id}`);
};

const editFee = (id, data) => {
  return http.put(`/fee/${id}`, data);
};

const deleteFee = (id) => {
  return http.delete(`/fee/${id}`);
};

const feeService = {
  addFee,
  addFeeSingleStudent,
  getFees,
  getFee,
  editFee,
  deleteFee,
};

export default feeService;

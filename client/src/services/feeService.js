import http from "../http-common";

const addFee = (data, token) => {
  return http.post("/fee", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addFeeSingleStudent = (id, data, token) => {
  return http.post(`/fee/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getFees = (page, pageSize, email, token) => {
  return http.get(`/fee?page=${page}&pageSize=${pageSize}&email=${email}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getFee = (id, token) => {
  return http.get(`/fee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editFee = (id, data, token) => {
  return http.put(`/fee/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteFee = (id, token) => {
  return http.delete(`/fee/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

import http from "../http-common";

const registerStudent = (data, token) => {
  return http.post("/student", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStudents = (page, pageSize, token) => {
  return http.get(`/student?page=${page}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getStudent = (id, token) => {
  return http.get(`/student/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateStudent = (id, data, token) => {
  return http.put(`/student/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteStudent = (id, token) => {
  return http.delete(`/student/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const studentService = {
  registerStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;

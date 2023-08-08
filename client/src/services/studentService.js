import http from "../http-common";

const registerStudent = (data) => {
  return http.post("/student", data);
};

const getStudents = (page, pageSize) => {
  return http.get(`/student?page=${page}&pageSize=${pageSize}`);
};

const getStudent = (id) => {
  return http.get(`/student/${id}`);
};

const updateStudent = (id, data) => {
  return http.put(`/student/${id}`, data);
};

const deleteStudent = (id) => {
  return http.delete(`/student/${id}`);
};

const studentService = {
  registerStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};

export default studentService;

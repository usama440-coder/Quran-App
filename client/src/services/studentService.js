import http from "../http-common";

const registerStudent = (data) => {
  return http.post("/student", data);
};

const getStudents = () => {
  return http.get("/student");
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

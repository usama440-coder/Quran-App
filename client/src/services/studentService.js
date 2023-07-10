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

const studentService = {
  registerStudent,
  getStudents,
  getStudent,
};

export default studentService;

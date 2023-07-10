import http from "../http-common";

const registerTeacher = (data) => {
  return http.post("/teacher", data);
};

const getTeachers = () => {
  return http.get("/teacher");
};

const getTeacher = (id) => {
  return http.get(`/teacher/${id}`);
};

const teacherService = {
  registerTeacher,
  getTeachers,
  getTeacher,
};

export default teacherService;

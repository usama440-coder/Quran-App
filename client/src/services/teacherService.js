import http from "../http-common";

const registerTeacher = (data) => {
  return http.post("/teacher", data);
};

const getTeachers = () => {
  return http.get("/teacher");
};

const teacherService = {
  registerTeacher,
  getTeachers,
};

export default teacherService;

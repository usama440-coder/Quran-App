import http from "../http-common";

const registerTeacher = (data) => {
  return http.post("/teacher", data);
};

const teacherService = {
  registerTeacher,
};

export default teacherService;

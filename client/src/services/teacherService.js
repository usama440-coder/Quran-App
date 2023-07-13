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

const updateTeacher = (id, data) => {
  return http.put(`/teacher/${id}`, data);
};

const deleteTeacher = (id) => {
  return http.delete(`/teacher/${id}`);
};

const teacherService = {
  registerTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};

export default teacherService;

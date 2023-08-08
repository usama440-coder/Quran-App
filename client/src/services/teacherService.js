import http from "../http-common";

const registerTeacher = (data) => {
  return http.post("/teacher", data);
};

const getTeachers = (page, pageSize) => {
  return http.get(`/teacher?page=${page}&pageSize=${pageSize}`);
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

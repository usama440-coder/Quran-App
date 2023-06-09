import http from "../http-common";

const registerCourse = (data) => {
  return http.post("/course", data);
};

const getCourses = () => {
  return http.get("/course");
};

const getCourse = (id) => {
  return http.get(`/course/${id}`);
};

const editCourse = (id, data) => {
  return http.put(`/course/${id}`, data);
};

const deleteCourse = (id) => {
  return http.delete(`/course/${id}`);
};

const courseService = {
  registerCourse,
  getCourses,
  getCourse,
  editCourse,
  deleteCourse,
};

export default courseService;

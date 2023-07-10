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

const courseService = {
  registerCourse,
  getCourses,
  getCourse,
};

export default courseService;
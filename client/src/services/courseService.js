import http from "../http-common";

const registerCourse = (data) => {
  return http.post("/course", data);
};

const getCourses = () => {
  return http.get("/course");
};

const courseService = {
  registerCourse,
  getCourses,
};

export default courseService;

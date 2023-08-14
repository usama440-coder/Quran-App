import http from "../http-common";

const registerCourse = (data, token) => {
  return http.post("/course", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getCourses = (page, pageSize, token) => {
  return http.get(`/course?page=${page}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getCourse = (id, token) => {
  return http.get(`/course/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editCourse = (id, data, token) => {
  return http.put(`/course/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteCourse = (id, token) => {
  return http.delete(`/course/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const courseService = {
  registerCourse,
  getCourses,
  getCourse,
  editCourse,
  deleteCourse,
};

export default courseService;

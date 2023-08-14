import http from "../http-common";

const registerTeacher = (data, token) => {
  return http.post("/teacher", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTeachers = (page, pageSize, token) => {
  return http.get(`/teacher?page=${page}&pageSize=${pageSize}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTeacher = (id, token) => {
  return http.get(`/teacher/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateTeacher = (id, data, token) => {
  return http.put(`/teacher/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTeacher = (id, token) => {
  return http.delete(`/teacher/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const teacherService = {
  registerTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};

export default teacherService;

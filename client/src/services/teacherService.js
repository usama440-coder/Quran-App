import http from "../http-common";

const registerTeacher = () => {
  return http.post("/teacher", data);
};

export default registerTeacher;

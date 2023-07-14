import http from "../http-common";

const getStats = () => {
  return http.get("/stats");
};

const statsService = {
  getStats,
};

export default statsService;

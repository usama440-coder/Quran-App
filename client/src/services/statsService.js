import http from "../http-common";

const getStats = (token) => {
  return http.get("/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const statsService = {
  getStats,
};

export default statsService;

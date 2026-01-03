import api from "./axios";

export const getDashboardData = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

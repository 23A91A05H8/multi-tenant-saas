import api from "./axios";

export const getProjects = async () => {
  const res = await api.get("/projects");

  // 🔥 HARD SAFETY FIX
  if (!res.data || !Array.isArray(res.data.data)) {
    return [];
  }

  return res.data.data;
};

export const createProject = async (project) => {
  const res = await api.post("/projects", project);
  return res.data.data;
};

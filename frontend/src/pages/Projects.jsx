import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/projects";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name });
      setName("");
      loadProjects();
    } catch (err) {
  console.error("Create project error:", err.response?.data || err);
  alert(err.response?.data?.message || "Create project failed");
}

  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Projects</h2>

      <form onSubmit={handleCreate}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
        />
        <button type="submit">Create</button>
      </form>

      <ul>
        {projects.length === 0 && <p>No projects yet</p>}
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;

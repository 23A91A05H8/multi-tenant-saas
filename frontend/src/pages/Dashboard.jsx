import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;

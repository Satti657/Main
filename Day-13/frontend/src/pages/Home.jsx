import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (error)
    return (
      <div style={{ padding: "20px" }}>
        <h2>{error}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      <br />
      <br />

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
  <li key={task.id}>
    <strong>{task.title}</strong>{" "}
    {task.completed ? "✅" : ""}
  </li>
))}
        </ul>
      )}
    </div>
  );
}

export default Home;
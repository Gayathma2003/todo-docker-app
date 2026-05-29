import { useEffect, useState } from "react";

const API_URL = "http://localhost:5002/tasks";

function TaskCard({ task, onDone }) {
  const [removing, setRemoving] = useState(false);

  function handleDone() {
    setRemoving(true);
    setTimeout(() => onDone(task.id), 300);
  }

  return (
    <div className={`task-card ${removing ? "fade-out" : ""}`}>
      <div className="task-text">
        <span className="task-title">{task.title}</span>
        <span className="task-desc">{task.description}</span>
      </div>
      <button className="done-btn" onClick={handleDone}>
        Done
      </button>
    </div>
  );
}

function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleAdd() {
    if (!title.trim() || !description.trim()) {
      setError("Both fields are required");
      return;
    }

    setError("");
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <div className="form-panel">
      <p className="form-label">Add a Task</p>

      {error && <p className="form-error">{error}</p>}

      <input
        className="form-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="add-btn" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask(title, description) {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    fetchTasks();
  }

  async function completeTask(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  }

  return (
    <div className="page">
      <div className="card">
        <AddTaskForm onAdd={addTask} />

        <div className="divider" />

        <div className="list-panel">
          {tasks.length === 0 ? (
            <p className="empty-msg">All done! Add a new task.</p>
          ) : (
            tasks.slice(0, 5).map((task) => (
              <TaskCard key={task.id} task={task} onDone={completeTask} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
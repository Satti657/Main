const express = require("express");

const app = express();

app.use(express.json());

// DATA (fake database)
let tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false
  }
];

// ================= ROUTES =================

// HOME
app.get("/", (req, res) => {
    res.json({
        message: "Server is working 🚀"
    });
});

// GET ALL TASKS
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// GET TASK BY ID
app.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// CREATE TASK
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// UPDATE TASK
app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json(task);
});

// DELETE TASK
app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully"
    });
});

// ================= SERVER =================
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
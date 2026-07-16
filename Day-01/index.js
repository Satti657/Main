const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        Hello World! <br>
        Welcome! Backend is running successfully 
    `);
});

app.get("/about", (req, res) => {
    res.json({ message: "About Page" });
});

app.get("/user", (req, res) => {
    res.json({ name: "Arslan", role: "Student" });
});

app.get("/status", (req, res) => {
    res.json({ status: "Server running 🚀" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
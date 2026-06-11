const express = require("express");
const db = require("../database/database");

const app = express();

const PORT = 3000;
db.run(`
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id TEXT,
        name TEXT,
        department TEXT,
        position TEXT
    )
`);

app.get("/", (req, res) => {
    res.send("<h1>Employee Management System Backend Running</h1>");
});
app.get("/employees", (req, res) => {
    res.json([
        {
            id: "EMP001",
            name: "John Doe",
            department: "IT"
        },
        {
            id: "EMP002",
            name: "Jane Smith",
            department: "HR"
        }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
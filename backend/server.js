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
db.get("SELECT COUNT(*) AS count FROM employees", (err, row) => {
    if (row.count === 0) {
        db.run(`
            INSERT INTO employees (employee_id, name, department, position)
            VALUES
            ('EMP001', 'John Doe', 'IT', 'Developer'),
            ('EMP002', 'Jane Smith', 'HR', 'Manager')
        `);
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Employee Management System Backend Running</h1>");
});
app.get("/employees", (req, res) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json(rows);
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
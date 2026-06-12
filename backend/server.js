const express = require("express");
const cors = require("cors");
const db = require("../database/database");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
db.run(`
    CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    department TEXT,
    position TEXT,
    salary INTEGER
)
`);
db.get("SELECT COUNT(*) AS count FROM employees", (err, row) => {

    if (err) {
        console.log("Database Error:", err.message);
        return;
    }

    if (row && row.count === 0) {

        db.run(`
            INSERT INTO employees
            (employee_id, name, email, phone, department, position, salary)
            VALUES
            ('EMP001', 'John Doe', 'john@example.com', '9876543210', 'IT', 'Developer', 50000),
            ('EMP002', 'Jane Smith', 'jane@example.com', '9876543211', 'HR', 'Manager', 60000)
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
app.get("/test-add", (req, res) => {

    db.run(
        `INSERT INTO employees
        (employee_id, name, email, phone, department, position, salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            "EMP999",
            "Veron",
            "veron@example.com",
            "9876543210",
            "IT",
            "Intern",
            25000
        ],
        function(err) {

            if (err) {
                return res.send(err.message);
            }

            res.send("Employee Added");

        }
    );

});
app.post("/employees", (req, res) => {

    const {
        employee_id,
        name,
        email,
        phone,
        department,
        position,
        salary
    } = req.body;

    db.run(
        `INSERT INTO employees
        (employee_id, name, email, phone, department, position, salary)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [employee_id, name, email, phone, department, position, salary],

        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Employee Added Successfully"
            });

        }
    );

});
app.delete("/employees/:id", (req, res) => {

    const id = req.params.id;

    db.run(
        "DELETE FROM employees WHERE id = ?",
        [id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Employee Deleted Successfully"
            });

        }
    );

});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
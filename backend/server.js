const express = require("express");

const app = express();

const PORT = 3000;

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
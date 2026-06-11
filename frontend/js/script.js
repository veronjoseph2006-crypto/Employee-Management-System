const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");

if (loginBtn) {
    loginBtn.addEventListener("click", function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "admin123") {
            message.textContent = "Login Successful";
        } else {
            message.textContent = "Invalid Username or Password";
        }

    });
}
const addEmployeeForm = document.getElementById("addEmployeeForm");

if (addEmployeeForm) {
    addEmployeeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const employee = {
            employee_id: document.getElementById("employeeId").value,
            name: document.getElementById("employeeName").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            position: document.getElementById("position").value,
            salary: document.getElementById("salary").value
        };

        const response = await fetch("http://localhost:3000/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

        const data = await response.json();

        alert(data.message);
    });
}
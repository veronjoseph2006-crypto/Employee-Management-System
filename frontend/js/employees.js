async function loadEmployees() {
    const response = await fetch("http://localhost:3000/employees");
    const employees = await response.json();

    const tableBody = document.getElementById("employeeTableBody");

    tableBody.innerHTML = "";

    employees.forEach(employee => {
        const row = `
            <tr>
                <td>${employee.employee_id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

loadEmployees();
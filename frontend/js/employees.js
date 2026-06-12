async function loadEmployees() {
  const response = await fetch("http://localhost:3000/employees");
  const employees = await response.json();

  const tableBody = document.getElementById("employeeTableBody");

  tableBody.innerHTML = "";

  employees.forEach((employee) => {
    const row = `
            <tr>
                <td>${employee.employee_id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>${employee.salary}</td>
                <td>
                    <button onclick="editEmployee(${employee.id})">
                        Edit
                    </button>
                    <button onclick="deleteEmployee(${employee.id})">
                       Delete
                    </button>
                </td>
            </tr>
        `;

    tableBody.innerHTML += row;
  });
}

loadEmployees();
async function deleteEmployee(id) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this employee?",
  );

  if (!confirmDelete) {
    return;
  }

  const response = await fetch(`http://localhost:3000/employees/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  alert(data.message);

  loadEmployees();
}
function editEmployee(id) {
  window.location.href = `edit-employee.html?id=${id}`;
}

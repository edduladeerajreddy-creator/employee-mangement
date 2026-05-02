console.log("JS LOADED ✅");

document.addEventListener("DOMContentLoaded", function () {

    fetch('/api/employees')
    .then(response => response.json())
    .then(data => {

        console.log("DATA FROM API:", data); // 👈 IMPORTANT

        const table = document.getElementById("employeeTable");

        if (!table) {
            console.error("❌ Table not found");
            return;
        }

        table.innerHTML = "";

        data.forEach(emp => {
            const row = `
                <tr>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.position}</td>
                    <td>${emp.salary}</td>
                    <td>${emp.performance_rating}</td>
                    <td>${emp.tasks_completed}</td>
                    <td>${emp.attendance_percentage}%</td>
                    <td>
                        <button onclick="deleteEmp(${emp.id})">Delete</button>
                    </td>
                </tr>
            `;
            table.innerHTML += row;
        });

    })
    .catch(err => console.error("❌ FETCH ERROR:", err));

});

function deleteEmp(id) {
    fetch(`/api/employees/${id}`, { method: 'DELETE' })
    .then(() => location.reload());
}
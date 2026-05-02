const db = require('../db');

exports.getAllEmployees = (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
    console.error(err);
    return res.status(500).send('Database Error');
}});
};

exports.getEmployeeById = (req, res) => {
    db.query('SELECT * FROM employees WHERE id=?', [req.params.id], (err, result) => {
        res.json(result[0]);
    });
};

exports.addEmployee = (req, res) => {
    const { name, email, position, salary, performance_rating, tasks_completed, attendance_percentage } = req.body;

    db.query(
        `INSERT INTO employees 
        (name, email, position, salary, performance_rating, tasks_completed, attendance_percentage) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, position, salary, performance_rating, tasks_completed, attendance_percentage],
        (err) => {
            if (err) {
    console.error(err);
    return res.status(500).send('Database Error');
} }
    );
};

exports.updateEmployee = (req, res) => {
    const { name, email, position, salary, performance_rating, tasks_completed, attendance_percentage } = req.body;

    db.query(
        `UPDATE employees 
         SET name=?, email=?, position=?, salary=?, performance_rating=?, tasks_completed=?, attendance_percentage=? 
         WHERE id=?`,
        [name, email, position, salary, performance_rating, tasks_completed, attendance_percentage, req.params.id],
        (err) => {
            if (err) {
    console.error(err);
    return res.status(500).send('Database Error');
}
        }
    );
};

exports.deleteEmployee = (req, res) => {
    db.query('DELETE FROM employees WHERE id=?', [req.params.id], (err) => {
       if (err) {
    console.error(err);
    return res.status(500).send('Database Error');
} });
};
const express = require('express');
const path = require('path');
const app = express();
const port = 3009;
const employees = require('./employees.json'); // Assuming employees data is stored in this file

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (like CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Search and filter API
app.get('/api/employees', (req, res) => {
    let filteredEmployees = employees;

    // Search filter (case insensitive)
    const { search, department, designation } = req.query;

    if (search && search.trim() !== '') {
        filteredEmployees = filteredEmployees.filter(employee =>
            employee.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (department && department.trim() !== '') {
        filteredEmployees = filteredEmployees.filter(employee =>
            employee.department.toLowerCase() === department.toLowerCase()
        );
    }

    if (designation && designation.trim() !== '') {
        filteredEmployees = filteredEmployees.filter(employee =>
            employee.designation.toLowerCase() === designation.toLowerCase()
        );
    }

    // Return the filtered list of employees
    res.json(filteredEmployees);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
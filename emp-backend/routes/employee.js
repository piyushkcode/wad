const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 1. Add a new employee or multiple employees
router.post('/add', async (req, res) => {
    try {
      const data = req.body;
  
      // Check if input is an array (multiple employees)
      if (Array.isArray(data)) {
        const employees = await Employee.insertMany(data);
        res.status(201).json({ message: 'Multiple employees added successfully', employees });
      } else {
        // Single employee
        const { name, department, designation, salary, joiningDate } = data;
        const newEmployee = new Employee({ name, department, designation, salary, joiningDate });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// 2. View all employee records
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Update an existing employee’s details
router.put('/update/:id', async (req, res) => {
  try {
    const { name, department, designation, salary, joiningDate } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, department, designation, salary, joiningDate },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. Delete an employee record
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

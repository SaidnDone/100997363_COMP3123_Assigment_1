// Import necessary modules or models
const Employee = require('../models/Employee'); // Assuming you have an Employee model

// Controller for getting all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for creating a new employee
const createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;

    // Validate input data here

    const newEmployee = new Employee({
      first_name,
      last_name,
      email,
      gender,
      salary,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for getting an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating an employee
const updateEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, salary } = req.body;
    const updatedEmployee = {
      first_name,
      last_name,
      email,
      gender,
      salary,
    };

    const employee = await Employee.findByIdAndUpdate(req.params.eid, updatedEmployee, {
      new: true, // Return the updated employee
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for deleting an employee
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.query.eid);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(204).end(); // No content response
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

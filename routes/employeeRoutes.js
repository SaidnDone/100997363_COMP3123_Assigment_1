const express = require('express');
const router = express.Router();

// Import the employee controller
const employeeController = require('../controllers/employeeController');

// Define the routes for employee management
router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.createEmployee);
router.get('/employees/:eid', employeeController.getEmployeeById); // Added :eid parameter
router.put('/employees/:eid', employeeController.updateEmployee); // Added :eid parameter
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;

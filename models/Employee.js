const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    max: 100,
  },
  last_name: {
    type: String,
    required: true,
    max: 50,
  },
  email: {
    type: String,
    unique: true,
    max: 50,
  },
  gender: {
    type: String,
    max: 25,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

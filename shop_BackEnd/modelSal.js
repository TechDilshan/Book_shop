const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSalSchema = new Schema({
    employeeEmail: { type: String, required: true},
    presentDate: { type: Date, required: true },
    perHourSalary: { type: Number, required: true },
    perDaySalary: { type: Number, required: true }
});

const EmployeeSal = mongoose.model('EmployeeSal', EmployeeSalSchema);

module.exports = EmployeeSal;
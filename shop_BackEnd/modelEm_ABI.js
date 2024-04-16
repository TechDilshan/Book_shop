const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
    username : {type: String, required : true},
    fullname : {type: String, required : true},
    email: {type: String, required : true, unique:true},
    nic: {type: String, required : true},
    eroll:{type: String, required : true},
    number: {type: String, required : true},
    address: {type: String, required : true},
    password: {type: String, required : true},
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee;
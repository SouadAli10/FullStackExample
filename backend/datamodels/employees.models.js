const mongoose = require('mongoose');

/// establish mongoos schema 
const Schema = mongoose.Schema;

/// models the schema for the 

const employeesData = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: false,
    },
    dateofBirth: {
        type: Number,
        required: true,
        unique: false,
    },
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    imagesource: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
}, {
    timestamps: true
})

///initialize the Employees modele 
const Employees = mongoose.model('Employees', employeesData)

///exporting the Employees module for further use 


module.exports = Employees



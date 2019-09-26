const mongoose = require('mongoose');

/// establish mongoos schema 
const Schema = mongoose.Schema;

/// models the schema for the departments 
const departmentSchema = new Schema({
    department: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
  }, {
    timestamps: true,
  });
  
  const Department = mongoose.model('Department', departmentSchema);
  
  module.exports = Department;

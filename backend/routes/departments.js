const router = require('express').Router();
let Department = require('../datamodels/departments.models');

router.route('/').get((req, res) => {
    Department.find()
    .then(departments => res.json(departments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const department = req.body.department;

  const newDepartment = new Department({department});

  newDepartment.save()
    .then(() => res.json('Department added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
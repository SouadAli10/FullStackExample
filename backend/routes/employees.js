const router = require('express').Router();
let Employee = require('../datamodels/employees.models');

///Create the get http request 

router.route('/').get((req, res) => {
    Employee.find()
      .then(Employee => res.json(Employee))
      .catch(err => res.status(400).json('Error: ' + err));
  });

///create the http post request

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = Number(req.body.phoneNumber);
    const dateofBirth = Date.parse(req.body.dateofBirth);
    const title = req.body.title;
    const imagesource = req.body.imagesource;
    const department = req.body.department;

    const newEmployee = new Employee({
        name,
        email,
        phoneNumber,
        dateofBirth,
        title,
        imagesource,
        department
    });

    newEmployee.save()
        .then(() => res.json('Employee added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

///create an http request to fetch an employee by ID
router.route('/:id').get((req, res) => {
  Employee.findById(req.params.id)
    .then(Employee => res.json(Employee))
    .catch(err => res.status(400).json('Error: ' + err));
});
///create the http delete request
router.route('/employeeDelete/:id').delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
///create the http update request
router.route('/update/:id').post((req, res) => {
  Employee.findById(req.params.id)
    .then(Employee => {
      Employee.name = req.body.name;
      Employee.email = req.body.email;
      Employee.phoneNumber = Number(req.body.phoneNumber);
      Employee.dateofBirth = Date.parse(req.body.dateofBirth);
      Employee.title = req.body.title;
      Employee.imagesource = req.body.imagesource;
      Employee.department = req.body.department;

      Employee.save()
        .then(() => res.json('Employee updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

  
///export the module api for use in the future
module.exports = router;
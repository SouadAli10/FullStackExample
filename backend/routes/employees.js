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

///create the http delete request
router.route('/employeeDelete/:_id').delete((req, res) => {
  Employee.findByIdAndRemove(req.params._id, (err, employee) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Employee successfully deleted",
        id: employee._id
    };
    return res.status(200).send(response);
});
  });

  
///export the module api for use in the future
module.exports = router;
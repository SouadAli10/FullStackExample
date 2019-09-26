const router = require('express').Router();
let Employee = require('../datamodels/employees.models');

///Create the get http request 

router.route('/').get((req, res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var department = req.query.department
  var search = req.query.name
  var query = {}
  if (pageNo < 0 || pageNo === 0) {
    var response = {
      "error": true,
      "message": "invalid page number, should start with 1"
    };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // query.department = department
  // if (query.department = "all"){
  //   delete query.department
  // }
  // Find some documents
  
  Employee.countDocuments({}, function (err, totalCount) {
    if (err) {
      response = {
        "error": true,
        "message": "Error fetching data"
      }
    }
    else if(department !== "" && department !== null){
      Employee.find({department: department, name: { $regex: search, $options: "$"}}, null, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          var response = {
            "error": true,
            "message": "Error fetching data"
          };
        } else {
          var totalPages = Math.ceil(totalCount / size)
         var  response = {
            "error": false,
            "employees": data,
            "pages": totalPages,
            "count": totalCount
          };
        }
        res.json(response);
      })
    }
    else  {
      Employee.find({ name: { $regex: search, $options: "$"}}, null, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
          var response = {
            "error": true,
            "message": "Error fetching data"
          };
        } else {
          var totalPages = Math.ceil(totalCount / size)
         var  response = {
            "error": false,
            "employees": data,
            "pages": totalPages,
            "count": totalCount
          };
        }
        res.json(response);
      })
    }

  })
})



///create the http post request

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
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
      Employee.phoneNumber = req.body.phoneNumber;
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
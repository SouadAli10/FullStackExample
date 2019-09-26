/// import the constants required to run the server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
require('dotenv').config(); ///config the env variables 
///initialize  the express framework and the port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());
///intitalize the connection to mongodb atlas through mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}); /// set useNewUrlParser and useCreateIndex to true in order to take care of any decripted functions 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
///create a file upload service http request

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({
      msg: 'No file uploaded'
    });
  }

  const file = req.files.file;
  const TRIM = /^\s+|\s+$/g;
  const INVALID = /[^a-z0-9 -_]/g;
  const WHITESPACE = /\s+/g;

  const safe_filename = file.name.toLowerCase()
  .replace(TRIM, '')
  .replace(INVALID, '')
  .replace(WHITESPACE, '_')
  file.mv(`../frontend/public/uploads/${safe_filename}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: safe_filename,
      filePath: `/uploads/${safe_filename}`
    });
  });
});

///import the router for further use in the server 
const employeeRouter = require('./routes/employees.js');
const departmentRouter = require('./routes/departments.js')
/// use the api imported 
app.use('/employees', employeeRouter);
app.use('/departments', departmentRouter)
///server listen 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
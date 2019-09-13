/// import the constants required to run the server
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config(); ///config the env variables 

///initialize  the express framework and the port
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

///intitalize the connection to mongodb atlas through mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});  /// set useNewUrlParser and useCreateIndex to true in order to take care of any decripted functions 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

///import the router for further use in the server 
const employeeRouter = require('./routes/employees.js');

/// use the api imported 
app.use('/employees', employeeRouter);

///server listen 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
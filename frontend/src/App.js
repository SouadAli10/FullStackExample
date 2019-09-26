import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route} from "react-router-dom";
import EmployeeList from './Components/Employeelist'
import CreateEmployee from './Components/CreateEmployee'
import EditEmployee from './Components/EditCurrentEmployee'
import Navbar from './Components/NavBar'
function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={EmployeeList} />
      <Route path="/edit/:id" component={EditEmployee} />
      <Route path="/create" component={CreateEmployee} />
      </div>
    </Router>
  );
}


export default App;

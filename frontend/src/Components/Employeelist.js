import React, { Component } from 'react';
import axios from 'axios';
import { Employees } from './Employees'
import { Pagination } from './Pagination'
import { FilterObject } from './FilterObject'
import { Search } from './Search'
export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    ///bind the methods that are present in the imported components to the state of the document 
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.handlePagination = this.handlePagination.bind(this);
    this.FilterDepartmentData = this.FilterDepartmentData.bind(this)
    this.onSubmitFilter = this.onSubmitFilter.bind(this)
    this.onResetFilter = this.onResetFilter.bind(this)
    this.onSearchName = this.onSearchName.bind(this)
    this.onSearchAction = this.onSearchAction.bind(this)
    this.state = {
      employeeData: [],
      PageNumberSet: 1,
      Pagesize: 3,
      name: '',
      department: '',
      departmentFilter: '',
      count: 1,
      departments: [],

    };
  }
  ///remove componentDidUpdate to prevent a never ending loop of API calls 
  componentDidMount() {
    this.loadData();
    this.loadDepartmentData();
    console.log(this.state.departments.map(function (department) {
      return <option
        key={department}
        value={department}>{department}
      </option>;
    }))
  }
  loadData() {
    axios.get(`http://localhost:5000/employees`, {
      params: {
        pageNo: this.state.pageNumbers,
        size: 3, name: this.state.name, department: this.state.departmentFilter

      }
    })
      .then(response => {
        this.setState({
          employeeData: response.data.employees,
          count: response.data.count
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  loadDepartmentData() {
    axios.get('http://localhost:5000/departments/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            departments: response.data.map(department => department.department),
            department: response.data[0].department
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  FilterDepartmentData(e) {
    this.setState({
      departmentFilter: e.target.value
    })
  }
  onSubmitFilter(e) {
    e.preventDefault();
    this.loadData();
    console.log(this.state.departmentFilter)
  }
  onResetFilter() {
    this.setState({
      departmentFilter: ""
    })
    this.loadData()
  }
  deleteEmployee(id) {
    axios.delete('http://localhost:5000/employees/employeeDelete/' + id)
      .then(response => { console.log(response.data.employees) });

    this.setState({
      employeeData: this.state.employeeData.filter(el => el._id !== id)
    })
  }
  employeeList() {
    return this.state.employeeData.map(currentemployeeData => {
      return <Employees employeeData={currentemployeeData} deleteEmployee={this.deleteEmployee} key={currentemployeeData._id} />;
    })
  }

  handlePagination(number) {
    this.setState({
      pageNumbers: number
    })
    this.loadData();
  }
  onSearchName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSearchAction(e) {
    e.preventDefault();
    this.loadData();
  }
  render() {
    return (
      <div>
        <Search onSearchName={this.onSearchName} onSearchAction={this.onSearchAction} />
        <FilterObject onSubmitFilter={this.onSubmitFilter} FilterDepartmentData={this.FilterDepartmentData} department={this.state.department} departmentFilter={this.state.departmentFilter} departments={this.state.departments} />
        <input class="btn btn-primary" onClick={this.onResetFilter} type="button" value="Reset Filter" />
        <h3>Employees List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>name</th>
              <th>Profile Picture</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of birth</th>
              <th>title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.employeeList()}
          </tbody>
        </table>
        < Pagination handlePagination={this.handlePagination} Pagesize={this.state.Pagesize} count={this.state.count} />

      </div>
    )
  }
}
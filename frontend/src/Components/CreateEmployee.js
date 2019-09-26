import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from './fileUpload'
export default class CreateEmployee extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeDateofBirth = this.onChangeDateofBirth.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      dateofBirth: new Date(),
      title: '',
      imagesource: '',
      department: '',
      departments: []
    }
  }
  //// the methods that are going to be used in the application 

  ///exporting the data for the departments that we have on the server when the component mount 
  componentDidMount() {
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

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    })
  }

  onChangeDateofBirth(date) {
    this.setState({
      dateofBirth: date
    })
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  onChangeDepartment(e) {
    this.setState({
      department: e.target.value
    })
  }
  handleStateChange(filePath) {
    let imagesource = filePath
    this.setState({ imagesource: imagesource })
  }
  onSubmit(e) {
    e.preventDefault();

    const employee = {
      name: this.state.name,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      dateofBirth: this.state.dateofBirth,
      title: this.state.title,
      imagesource: this.state.imagesource,
      department: this.state.department
    }

    console.log(employee);

    axios.post('http://localhost:5000/employees/add', employee)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Employee Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Full Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input type="email"
              required
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone </label>
            <input
              type="tel"
              required
              className="form-control"
              value={this.state.phoneNumber}
              onChange={this.onChangePhoneNumber}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <div>
              <DatePicker
                required
                selected={this.state.dateofBirth}
                onChange={this.onChangeDateofBirth}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Title: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Upload Picture: </label>
            <FileUpload handleStateChange={this.handleStateChange} />
          </div>
          <div className="form-group">
            <label>Department: </label>
            <select ref="departmentInput"
              required
              className="form-control"
              value={this.state.department}
              onChange={this.onChangeDepartment}>
              {
                this.state.departments.map(function (department) {
                  return <option
                    key={department}
                    value={department}>{department}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
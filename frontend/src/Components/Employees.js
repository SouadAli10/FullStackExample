import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

export const Employees = props => {
  var Style = {
    hight: '85px',
    width: '90px'
  };
  return (
    <tr>
      <td>{props.employeeData.name}</td>
      <td>
        <img src={props.employeeData.imagesource} style={Style} />
      </td>
      <td>{props.employeeData.email}</td>
      <td>{props.employeeData.phoneNumber}</td>
      <td>{moment(props.employeeData.dateofBirth).format('dddd, MMMM Do, YYYY')}</td>
      <td>{props.employeeData.title}</td>
      <td>
        <Link to={"/edit/" + props.employeeData._id}>edit </Link>| <a href="#" onClick={() => { props.deleteEmployee(props.employeeData._id) }}>delete</a>
      </td>
    </tr>
  )
}

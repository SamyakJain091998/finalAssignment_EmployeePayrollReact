import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import image1 from './Ellipse -1.png';
import image2 from './Ellipse -2.png';
import image3 from './Ellipse -4.png';
import image4 from './Ellipse -5.png';


class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });

        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="Container">
                    <span className="add-employee-button">
                        <button className="btn btn-primary" onClick={this.addEmployee}>
                            Add Employees
                        </button>
                    </span>
                </div>
                <h2 className="text-center">Employees List</h2>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> <center>Profile Pic </center></th>
                                <th> <center>First Name </center></th>
                                <th> <center>Last Name </center></th>
                                <th> <center>Email Id </center></th>
                                <th> <center>Salary </center></th>
                                <th> <center>Note</center> </th>
                                <th> <center>Actions</center> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td><center><img src={employee.profilePic}></img>{employee.profilePic}</center></td>
                                            <td><center>{employee.firstName}</center></td>
                                            <td><center>{employee.lastName}</center></td>
                                            <td><center>{employee.emailId}</center></td>
                                            <td><center>{employee.salary}</center></td>
                                            <td><center>{employee.note}</center></td>
                                            <td><center>
                                                <button onClick={() => this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px", backgroundColor: 'green' }} onClick={() => this.viewEmployee(employee.id)} className="btn btn-info">View Details</button>
                                            </center>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;
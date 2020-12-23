import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import image1 from './Ellipse-1.png';
import image2 from './Ellipse-2.png';
import image3 from './Ellipse-4.png';
import image4 from './Ellipse-5.png';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {},
            department: []
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({
                employee: res.data
            });
        });
        EmployeeService.getEmployeeDepartmentById(this.state.id).then((res) => {
            this.setState({
                department: res.data
            });
        });
    }

    printEmployeeObject() {
        // console.log("------------>" + this.state.employee.department.map((elmnt) => elmnt));
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE PROFILE PIC  </label>
                            <label> : </label>

                            <div> <img src={this.state.employee.profilePic === "./Ellipse-1.png" ? image1 : this.state.employee.profilePic === "./Ellipse-2.png" ? image2 : this.state.employee.profilePic === "./Ellipse-4.png" ? image3 : this.state.employee.profilePic === "./Ellipse-5.png" ? image4 : image4}></img></div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE FIRST NAME  </label>
                            <label> : </label>
                            <div> <center>{this.state.employee.firstName}</center></div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE LAST NAME  </label>
                            <label> : </label>
                            <div> {this.state.employee.lastName}</div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE GENDER  </label>
                            <label> : </label>
                            <div> {this.state.employee.gender}</div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE EMAIL ID  </label>
                            <label> : </label>
                            <div> {this.state.employee.emailId}</div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE DEPARTMENT  </label>
                            <label> : </label>
                            <div>
                                {
                                    this.state.department.map(dept => <label style={{ marginRight: "10px" }}>{dept}</label>)
                                }
                                <div>
                                    <label>
                                        {
                                            this.printEmployeeObject()
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE START DATE  </label>
                            <label> : </label>
                            <div> {this.state.employee.startDate}</div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE SALARY  </label>
                            <label> : </label>
                            <div> {this.state.employee.salary}</div>
                        </div>
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE NOTE  </label>
                            <label> : </label>
                            <div> {this.state.employee.note}</div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;
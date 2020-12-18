import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({
                employee: res.data
            });
        });

    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE PROFILE PIC  </label>
                            <label> : </label>
                            
                            <div> <img src={this.state.employee.profilePic}></img></div>
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
                            <label style={{ backgroundColor: '#ADD8E6' }}> EMPLOYEE EMAIL ID  </label>
                            <label> : </label>
                            <div> {this.state.employee.emailId}</div>
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
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import image1 from './Ellipse-1.png';
import image2 from './Ellipse-2.png';
import image3 from './Ellipse-4.png';
import image4 from './Ellipse-5.png';
import defaultImage from './PngItem_1503945.png';
import updateImage from './create-black-18dp.svg';
import deleteImage from './delete-black-18dp.svg';
import infoImage from './info-icon.svg';
import addImage from './add-24px.svg';
import searchIcon from './magnifying-glass-search-512.png';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: [],
            searchedEmployeeList: [],
            department: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.searchEmployee = this.searchEmployee.bind(this);
    }


    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });

        });
        EmployeeService.getEmployeeDepartmentById(this.state.id).then((res) => {
            this.setState({
                department: res.data
            });
        });
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    searchEmployee = (event) => {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
            let employees = this.state.employees;
            let dummySearchedEmployeeList = this.state.searchedEmployeeList;
            dummySearchedEmployeeList = employees.filter((dummyEmployee) => dummyEmployee.firstName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
            console.log(dummySearchedEmployeeList);
            this.setState({ employees: dummySearchedEmployeeList });
        });
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
                <br></br><br></br>
                <div className="Container">
                    <div class="flex-row-action">
                        <label className="text-center" style={{ fontSize: "30px" }}>Employee Details</label>&nbsp;&nbsp;&nbsp;
                        <button class="employee-count-button" style={{ backgroundColor: "#82a70c", color: "white" }}>{this.state.employees.length}</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <MDBCol md="6">
                            <div className="input-group md-form form-sm form-1 pl-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text purple lighten-3" id="basic-text1" style={{ marginLeft: "354px", height: "38px" }}>
                                        {/* <MDBIcon className="text-white" icon="search" /> */}
                                        <img src={searchIcon} style={{ height: "13px" }} ></img>
                                    </span>
                                </div>
                                <input className="form-control my-0 py-1" type="text" placeholder="Search Employee.." aria-label="Search" onChange={this.searchEmployee} style={{}} />
                            </div>
                        </MDBCol>

                        <span className="add-employee-button"> &nbsp;&nbsp;&nbsp;
                            <button className="btn" onClick={this.addEmployee} style={{ backgroundColor: "#82a70c", color: "white" }}>
                                <img src={addImage} />Add Employee
                            </button>
                        </span>
                    </div>
                </div>
                {/* <h2 className="text-center">Employees List</h2> */}
                <br></br>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>PROFILE PIC </center></th>
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>FIRST NAME </center></th>
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>LAST NAME </center></th>
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>DEPARMENT's </center></th>
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>START DATE </center></th>
                                {/* <th style = {{backgroundColor: "#42515F", color: "white"}}> <center>Email Id </center></th> */}
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>SALARY </center></th>
                                {/* <th style = {{backgroundColor: "#42515F", color: "white"}}> <center>Note</center> </th> */}
                                <th style={{ backgroundColor: "#42515F", color: "white" }}> <center>ACTIONS</center> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td><center><img style={{ height: "33px", width: "33px" }} src={employee.profilePic === "./Ellipse-1.png" ? image1 : employee.profilePic === "./Ellipse-2.png" ? image2 : employee.profilePic === "./Ellipse-4.png" ? image3 : employee.profilePic === "./Ellipse-5.png" ? image4 : defaultImage}></img></center></td>
                                            <td><center>{employee.firstName}</center></td>
                                            <td><center>{employee.lastName}</center></td>
                                            <td>
                                                <center>
                                                    {/* {
                                                        this.state.department.map(dept => <label style={{ marginRight: "10px" }}>{dept}</label>)
                                                    } */}
                                                    {employee.department.map(elmt => <button style = {{marginRight: "5px", backgroundColor: "#d9f386", borderRadius: "15px", borderColor: "#d9f386"}}>{elmt}</button>)}
                                                </center>
                                            </td>
                                            <td><center>{employee.startDate}</center></td>
                                            {/* <td><center>{employee.emailId}</center></td> */}
                                            <td><center>{employee.salary}</center></td>
                                            {/* <td><center>{employee.note}</center></td> */}
                                            <td style={{ alignContent: "initial" }}>
                                                <div class="flex-row-action">
                                                    <div class="cursorPointer">
                                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <img src={updateImage} onClick={() => this.editEmployee(employee.id)} />&nbsp;&nbsp;&nbsp;
                                                            <img src={deleteImage} onClick={() => this.deleteEmployee(employee.id)} />&nbsp;&nbsp;&nbsp;
                                                        </div>
                                                    <div class="infoPointer">
                                                        <img src={infoImage} onClick={() => this.viewEmployee(employee.id)} style={{ height: "20px", width: "20px" }} />
                                                    </div>
                                                </div>
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
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import image1 from './Ellipse -1.png';
import image2 from './Ellipse -2.png';
import image3 from './Ellipse -4.png';
import image4 from './Ellipse -5.png';

class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: '',
            profilePic: '',
            salary: '40000',
            note: '',
            // profile1: false,
            // profile2: false
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeProfilePicHandler = this.changeProfilePicHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changeNoteHandler = this.changeNoteHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId,
                    profilePic: employee.profilePic,
                    salary: employee.salary,
                    note: employee.note,
                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, profilePic: this.state.profilePic, salary: this.state.salary, note: this.state.note };
        console.log('employee => ' + JSON.stringify(employee));
        if (this.state.id === '_add') {
            let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
            if (!(nameRegex.test(this.state.firstName))) {
                alert("Name incorrect!");
                this.props.history.push('/add-employee/_add');
            } else {
                EmployeeService.createEmployee(employee).then(res => {
                    this.props.history.push('/employees');
                });
            }

        } else {
            let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
            if (!(nameRegex.test(this.state.firstName))) {
                alert("Name incorrect!");
                this.props.history.push(`/add-employee/${this.state.id}`);
            } else {
                EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                    this.props.history.push('/employees');
                });
            }
            // EmployeeService.updateEmployee(employee, this.state.id).then(res => {
            //     this.props.history.push('/employees');
            // });

        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    changeProfilePicHandler = (event) => {
        this.setState({ profilePic: event.target.value });
        console.log({ image1 });
    }

    changeSalaryHandler = (event) => {
        this.setState({ salary: event.target.value });
    }

    changeNoteHandler = (event) => {
        this.setState({ note: event.target.value });
    }

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">ADD EMPLOYEE FORM</h3>
        } else {
            return <h3 className="text-center">UPDATE EMPLOYEE FORM</h3>
        }
    }

    // isChecked() {
    //     if (this.state.profilePic == "./Ellipse -1.png") {
    //         this.setState({ profile1: true });
    //     }
    // }

    // isCheckedOne() {
    //     if (this.state.profilePic == "./Ellipse -2.png") {
    //         this.setState({ profile2: true });
    //     }
    // }


    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                {
                    this.getTitle()
                }
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <div className="card-body">
                                <form>

                                    <div className="form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>


                                    <div class="row-content">
                                        <label class="label text" for="profile">Profile images</label>
                                        <div class="profile-radio-content">
                                            <label>
                                                <input type="radio" id="profile1" name="profile" value='./Ellipse -1.png' onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>
                                                <img class="profile" id="image1" src={image1}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile2" name="profile" value='./Ellipse -2.png' onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>
                                                <img class="profile" id="image2" src={image2}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile3" name="profile" value='./Ellipse -4.png' onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>
                                                <img class="profile" id="image3" src={image3}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile4" name="profile" value='./Ellipse -5.png' onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>
                                                <img class="profile" id="image4" src={image4}></img>
                                            </label>
                                        </div>
                                    </div>


                                    <div className="form-group">
                                        <label> Salary:
                                        <output class="salary-output text" for="salary">({this.state.salary})</output>
                                        </label>
                                        <input type="range" name="salary" min="500" max="60000" step="100" className="form-control"
                                            value={this.state.salary} onChange={this.changeSalaryHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Note: </label>
                                        <textarea class="input" input placeholder="note" name="note" className="form-control"
                                            value={this.state.note} onChange={this.changeNoteHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;
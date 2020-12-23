import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import image1 from './Ellipse-1.png';
import image2 from './Ellipse-2.png';
import image3 from './Ellipse-4.png';
import image4 from './Ellipse-5.png';

class CreateEmployeeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            gender: '',
            emailId: '',
            // department: ['HR', 'FINANCE'],
            department: [],
            day: '',
            month: '',
            year: '',
            profilePic: '',
            salary: '40000',
            note: ''
        }

        // First Name checker function
        this.checkFirstName = this.checkFirstName.bind(this);
        // Last Name checker function
        this.checkLastName = this.checkLastName.bind(this);
        this.changeGenderHandler = this.changeGenderHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.isCheckBoxChecked = this.isCheckBoxChecked.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeDayHandler = this.changeDayHandler.bind(this);
        this.changeMonthHandler = this.changeMonthHandler.bind(this);
        this.changeYearHandler = this.changeYearHandler.bind(this);
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
                var convertedDate = employee.startDate.toString();

                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    gender: employee.gender,
                    department: employee.department,
                    emailId: employee.emailId,
                    day: convertedDate[0] + convertedDate[1],
                    month: convertedDate[3] + convertedDate[4] + convertedDate[5],
                    year: convertedDate[7] + convertedDate[8] + convertedDate[9] + convertedDate[10],
                    profilePic: employee.profilePic,
                    salary: employee.salary,
                    note: employee.note,
                });
            });
        }
    }

    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let startDateDummy = this.state.day + " " + this.state.month;
        startDateDummy = startDateDummy + " " + this.state.year;
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, gender: this.state.gender, emailId: this.state.emailId, department: this.state.department, startDate: startDateDummy, profilePic: this.state.profilePic, salary: this.state.salary, note: this.state.note };
        console.log('employee => ' + JSON.stringify(employee));

        if (this.state.firstName == '' || this.state.gender == '' || this.state.department == '' ||
            this.state.day == '' || this.state.month == '' || this.state.year == '') {
            alert("Please fill the required details");
        }

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push('/employees');
            });

        }
    }

    checkFirstName = (event) => {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        const textError = document.querySelector('.fNameText-error');
        const textErrorNew = document.querySelector('.fNameText-error-new');

        if (event.target.value.length == 0) {
            this.setState({ firstName: event.target.value });
            textErrorNew.textContent = "";
            textError.textContent = "";
        }
        else if ((nameRegex.test(event.target.value))) {
            textErrorNew.textContent = "Fine";
            textError.textContent = "";
            this.setState({ firstName: event.target.value });
        } else {
            this.setState({ firstName: event.target.value });
            textErrorNew.textContent = "";
            textError.textContent = "Incorrect";
        }
    }

    checkLastName = (event) => {
        let nameRegex = RegExp('^$|^[A-Z]{1}[a-zA-Z]{2,}$');
        const textError = document.querySelector('.lNameText-error');
        const textErrorNew = document.querySelector('.lNameText-error-new');

        if (event.target.value.length == 0) {
            this.setState({ lastName: event.target.value });
            textErrorNew.textContent = "";
            textError.textContent = "";
        }
        else if ((nameRegex.test(event.target.value))) {
            this.setState({ lastName: event.target.value });
            textErrorNew.textContent = "Fine";
            textError.textContent = "";
        } else {
            this.setState({ lastName: event.target.value });
            textErrorNew.textContent = "";
            textError.textContent = "Incorrect";
        }
    }

    changeGenderHandler = (event) => {
        this.setState({ gender: event.target.value });
    }

    changeDepartmentHandler = (event) => {
        // console.log(event.target.checked);
        if (this.isCheckBoxChecked(event.target.value)) {
            event.target.checked = false;
            console.log(event.target.checked);
        }

        if (this.state.department.indexOf(event.target.value) > -1) {
            this.state.department.splice(this.state.department.indexOf(event.target.value), 1);
        } else {
            this.state.department.push(event.target.value);
        }
        // if (this.state.department.length == 0) {
        //     alert("Fill atleast one department!!");
        // }
    }

    isCheckBoxChecked(deptName) {
        if (this.state.department.indexOf(deptName) > -1) {
            return true;
        }
        return false;

        // for (let index = 0; index < this.state.department.length; index++) {
        //     const element = department[index];
        //     if(element === deptName){

        //     }
        // }

        //     }

        // indexOf.
        // st > -1ate.department = (event) => {
        //     this.department({ emailId: event.target.value });
        // }if(element === deptName){

    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    changeDayHandler = (event) => {
        this.setState({ day: event.target.value });
    }

    changeMonthHandler = (event) => {
        this.setState({ month: event.target.value })
    }

    changeYearHandler = (event) => {
        this.setState({ year: event.target.value })
    }

    changeProfilePicHandler = (event) => {
        this.setState({ profilePic: event.target.value });
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

    reset() {
        // this.state.firstName = '';
        this.setState({ firstName: '' });
        this.setState({ lastName: '' });
        this.setState({ emailId: '' });
        this.setState({ note: '' });
        this.setState({ gender: '' });
        this.setState({ department: [] });
        this.setState({ day: '' })
        this.setState({ month: '' });
        this.setState({ year: '' });
        this.setState({ salary: '40000' });

    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">EMPLOYEE PAYROLL FORM</h3>
        } else {
            return <h3 className="text-center">UPDATE EMPLOYEE FORM</h3>
        }
    }

    render() {
        return (
            <div>
                {/* <br></br> */}
                <div style={{ marginTop: "8px" }}>
                    {
                        this.getTitle()
                    }
                </div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-10 offset-md-2 offset-md-3" style={{ marginLeft: "120px" }}>
                            <div className="card-body">
                                <form>
                                    <div class="flex-row-action">
                                        <label> First Name: </label><label style = {{color: "red"}}>*</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className="form-group">
                                            <input placeholder="First Name" name="firstName" className="form-control"
                                                value={this.state.firstName} onChange={this.checkFirstName} required />
                                            <error-output class="fNameText-error" for="text"></error-output>
                                            <error-output class="fNameText-error-new" for="text"></error-output>
                                        </div>
                                    </div>
                                    <div class="flex-row-action">
                                        <label> Last Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className="form-group">
                                            <input placeholder="Last Name" name="lastName" className="form-control"
                                                value={this.state.lastName} onChange={this.checkLastName} />
                                            <error-output class="lNameText-error" for="text"></error-output>
                                            <error-output class="lNameText-error-new" for="text"></error-output>
                                        </div>
                                    </div>
                                    <div class="row-content">
                                        <div class="flex-row-action">
                                            <label class="label text" for="gender">Gender: </label><label style = {{color: "red"}}>*</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <div>
                                                <input class="gender-radio" type="radio" id="male" name="gender" value="male" checked={this.state.gender === "male"} onChange={this.changeGenderHandler} required />&nbsp;&nbsp;&nbsp;
                                                <label class="gender-text" for="male">Male</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input class="gender-radio" type="radio" id="female" name="gender" value="female" checked={this.state.gender === "female"} onChange={this.changeGenderHandler} required />&nbsp;&nbsp;&nbsp;
                                                <label class="gender-text" for="female">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="row-content">
                                        <div class="flex-row-action">
                                            <label class="label text" for="gender">Departments: </label><label style = {{color: "red"}}>*</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <div>
                                                <input class="department-radio" type="checkbox" id="hr" name="department" value="HR" checked={this.isCheckBoxChecked("HR")} onChange={this.changeDepartmentHandler} required />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label class="department-text" for="hr">HR</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input class="department-radio" type="checkbox" id="finance" name="department" value="FINANCE" checked={this.isCheckBoxChecked("FINANCE")} onChange={this.changeDepartmentHandler} required />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label class="department-text" for="finance">FINANCE</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input class="department-radio" type="checkbox" id="sales" name="department" value="SALES" checked={this.isCheckBoxChecked("SALES")} onChange={this.changeDepartmentHandler} required />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label class="department-text" for="sales">SALES</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input class="department-radio" type="checkbox" id="operations" name="department" value="OPERATIONS" checked={this.isCheckBoxChecked("OPERATIONS")} onChange={this.changeDepartmentHandler} required />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label class="department-text" for="operations">OPERATIONS</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <input class="department-radio" type="checkbox" id="operations" name="department" value="OTHERS" checked={this.isCheckBoxChecked("OTHERS")} onChange={this.changeDepartmentHandler} required />&nbsp;&nbsp;&nbsp;&nbsp;
                                                <label class="department-text" for="others">OTHERS</label>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="flex-row-action">
                                        <label> Email Id: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className="form-group">
                                            <input placeholder="Email Address" name="emailId" className="form-control"
                                                value={this.state.emailId} onChange={this.changeEmailHandler} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="flex-row-action">
                                        <label class="label text" for="startDate">Start Date: </label><label style = {{color: "red"}}>*</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div id="date">
                                            <select id="day" name="Day" value={this.state.day} onChange={this.changeDayHandler} required>
                                                <option value="" disabled selected>Day</option>
                                                <option value="01">1</option>
                                                <option value="02">2</option>
                                                <option value="03">3</option>
                                                <option value="04">4</option>
                                                <option value="05">5</option>
                                                <option value="06">6</option>
                                                <option value="07">7</option>
                                                <option value="08">8</option>
                                                <option value="09">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <select id="month" name="Month" value={this.state.month} onChange={this.changeMonthHandler} required>
                                                <option value="" disabled selected>Month</option>
                                                <option value="Jan">Jan</option>
                                                <option value="Feb">Feb</option>
                                                <option value="Mar">Mar</option>
                                                <option value="Apr">Apr</option>
                                                <option value="May">May</option>
                                                <option value="Jun">Jun</option>
                                                <option value="Jul">Jul</option>
                                                <option value="Aug">Aug</option>
                                                <option value="Sep">Sep</option>
                                                <option value="Oct">Oct</option>
                                                <option value="Nov">Nov</option>
                                                <option value="Dec">Dec</option>
                                            </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <select id="year" name="Year" value={this.state.year} onChange={this.changeYearHandler} required>
                                                <option value="" disabled selected>Year</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                            </select>
                                            {/* <date-error-output class="date-text-error" for="text"></date-error-output> */}
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="row-content">
                                        <div class="profile-radio-content">
                                            <label class="label text" for="profile">Profile images: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input type="radio" id="profile1" name="profile" value='./Ellipse-1.png' checked={this.state.profilePic === "./Ellipse-1.png"} onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img class="profile" id="image1" src={image1}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile2" name="profile" value='./Ellipse-2.png' checked={this.state.profilePic === "./Ellipse-2.png"} onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img class="profile" id="image2" src={image2}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile3" name="profile" value='./Ellipse-4.png' checked={this.state.profilePic === "./Ellipse-4.png"} onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img class="profile" id="image3" src={image3}></img>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label>
                                                <input type="radio" id="profile4" name="profile" value='./Ellipse-5.png' checked={this.state.profilePic === "./Ellipse-5.png"} onChange={this.changeProfilePicHandler} alt="image"
                                                    required></input>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <img class="profile" id="image4" src={image4}></img>
                                            </label>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="flex-row-action">
                                        <label> Salary: </label>
                                        <output class="salary-output text" for="salary">({this.state.salary})</output>
                                    </div>
                                    <div className="form-group">
                                        <input type="range" name="salary" min="500" max="60000" step="100" className="form-control"
                                            value={this.state.salary} onChange={this.changeSalaryHandler} style={{ marginLeft: "104px" }} />
                                    </div>

                                    <div class="flex-row-action">
                                        <label> Note: </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <div className="form-group">
                                            <textarea class="input-note" input placeholder="note" name="note" className="form-control"
                                                value={this.state.note} onChange={this.changeNoteHandler} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div class="flex-row-action">
                                        <button class="button cancelButton" onClick={this.cancel.bind(this)} style={{ marginLeft: "50px" }}>Cancel</button>
                                        <button type="submit" class="button submitButton" id="submitButton" onmouseover="" onClick={this.saveOrUpdateEmployee} style={{ marginLeft: "260px" }}>Save</button>
                                        <button type="reset" class="resetButton button" onClick={this.reset.bind(this)}>Reset</button>
                                    </div>
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
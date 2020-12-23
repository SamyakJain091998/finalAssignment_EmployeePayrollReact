import React, { Component } from 'react';
import logo from './logo.png';

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div class="App-header">
                <div class="header-flex-row-action">
                    <a href="http://localhost:3000/employees"><img src={logo} style={{ height: "60px", width: "60px", marginTop: "12px" }} /></a>&nbsp;
                    <div class="">
                        <span class="emp-text">EMPLOYEE</span><br/>
                        <span class="emp-text emp-payroll">PAYROLL</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;
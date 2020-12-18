import React, { Component } from 'react';

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div class="App-header">
                <header class = "header-text">
                    <div><b><a id = "homePage-link" href = "http://localhost:3000/employees">Employee Management App</a></b></div>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
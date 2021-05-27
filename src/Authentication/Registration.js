import React from 'react';
import './Registration.css';
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingSpinnerConfig = 
    {
        css: css`position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);`,
        size: 500,
        color: '#00ff55',
        height: 70,
        width: 5
    }

class RegistrationForm extends React.Component {
    // Used https://reactjs.org/docs/forms.html#handling-multiple-inputs

    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Email: "",
            Password: "",
            FirstName: "",
            LastName: "",
            errorMessage: "",
            showErrorMessage: false,
            loading: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.DisplayErrorMessage = this.DisplayErrorMessage.bind(this);
    }
    
      handleInputChange(event) {    
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleFormSubmit(event) {
        this.ToggleLoading(true);
        event.preventDefault();

        var data = 
        {
            Username : this.state.Username,
            Email : this.state.Email,
            Password : this.state.Password,
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
        }

        // client-side input sanitization/validation

        let response = await fetch('https://dbballentine.com/golf/api/authenticate/register', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (res.ok) {
                console.log("SUCCESS - REDIRECT TO LOGIN PAGE");
            }
            else {
                console.log("NON SUCCESSFULL - DISPLAY ERROR AND STAY ON THIS PAGE");
                res.json().then(data => {
                    this.DisplayErrorMessage(data.message);    
                });
            }
        });
        this.ToggleLoading(false);
    }

    DisplayErrorMessage(message) {
        console.log("we in this bitch. message: " + message);
        this.setState({
            "errorMessage": message,
            "showErrorMessage": true,
          });
    }

    ToggleLoading(newVal) {
        this.state.loading = newVal;
    }

    render() {
      return (
        <div className="RegistrationFormContainer">
            <ScaleLoader loading={this.state.loading} color={LoadingSpinnerConfig.color} css={LoadingSpinnerConfig.css} height={LoadingSpinnerConfig.height} width={LoadingSpinnerConfig.width} />
            <form className="RegistrationForm" onSubmit={this.handleFormSubmit}>
                <label htmlFor="Username">
                    Username
                    <input type="text" name="Username" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="Email">
                    Email
                    <input type="text" name="Email" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="Password">
                    Password
                    <input type="password" name="Password" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="FirstName">
                    FirstName
                    <input type="text" name="FirstName" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="LastName">
                    LastName
                    <input type="text" name="LastName" onChange={this.handleInputChange}/>
                </label>

                <div className="ErrorMessageContainer">
                    { this.state.showErrorMessage ? <ErrorMessage message={this.state.errorMessage}/> : null }
                </div>

                <input type="submit" value="Register"/>
            </form>
        </div>
        );
    }
}

const ErrorMessage = (props) => (
    <div className="ErrorMessage">
        {props.message}
    </div>
  );

export default RegistrationForm;
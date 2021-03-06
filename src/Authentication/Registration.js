import React from 'react';
import {Link} from "react-router-dom";
import './Registration.css';
import BounceLoader from "react-spinners/BounceLoader";
import {LoadingSpinnerConfig} from "../GlobalVars.js";

class Registration extends React.Component {
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

        // client-side input sanitization/validation
        if (!this.state.Username || !this.state.Email || !this.state.Password || !this.state.FirstName || !this.state.LastName){
            this.ToggleLoading(false);
            this.DisplayErrorMessage("All fields must be filled in!");
            return;
        }

        var data = 
        {
            Username : this.state.Username,
            Email : this.state.Email,
            Password : this.state.Password,
            FirstName : this.state.FirstName,
            LastName : this.state.LastName,
        }

        await fetch('https://dbballentine.com/golf/api/authenticate/register', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (res.ok) {
                console.log("REGISTRATION SUCCESS - REDIRECTING TO LOGIN PAGE");
                this.props.history.push("/login");
            }
            else {
                res.json().then(data => {
                    this.DisplayErrorMessage(data.message);    
                });
            }
        });
        this.ToggleLoading(false);
    }

    DisplayErrorMessage(message) {
        this.setState({
            "errorMessage": message,
            "showErrorMessage": true,
          });
    }

    ToggleLoading(newVal) {
        this.setState({
            "loading": newVal
        });
    }

    render() {
      return (
        <div className="RegistrationFormContainer">
            <BounceLoader loading={this.state.loading} color={LoadingSpinnerConfig.color} css={LoadingSpinnerConfig.css} size={LoadingSpinnerConfig.size} speedMultiplier={LoadingSpinnerConfig.speedMultiplier} />
            { this.state.loading ? <div style={{position: 'fixed', display: 'block', width: '100%', height: '100%', zIndex:2, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}/> : null }
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
                    First Name
                    <input type="text" name="FirstName" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="LastName">
                    Last Name
                    <input type="text" name="LastName" onChange={this.handleInputChange}/>
                </label>

                <div className="ErrorMessageContainer">
                    { this.state.showErrorMessage ? <ErrorMessage message={this.state.errorMessage}/> : null }
                </div>

                <input type="submit" value="Register"/>
            </form>

            <div>
                <label className="LoginLinkLabel"> Already have an account?</label>
                <Link to="/login" className="LoginLink">Login</Link>
            </div>
            
        </div>
        );
    }
}

const ErrorMessage = (props) => (
    <div className="ErrorMessage">
        {props.message}
    </div>
  );

export default Registration;
import React from 'react';
import {Link} from "react-router-dom";
import './Login.css';
import BounceLoader from "react-spinners/BounceLoader";
import {LoadingSpinnerConfig, storageTokenKey} from "../GlobalVars.js";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
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
        if (!this.state.Username || !this.state.Password){
            this.ToggleLoading(false);
            this.DisplayErrorMessage("All fields must be filled in!");
            return;
        }

        var data = 
        {
            Username : this.state.Username,
            Password : this.state.Password,
        }

        await fetch('https://dbballentine.com/golf/api/authenticate/login', {
            method: 'POST',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => {
            if (res.ok) {
                console.log("LOGIN SUCCESS - REDIRECTING TO HOME PAGE");
                res.json().then(data => {
                    localStorage.setItem(storageTokenKey, data.token);
                    this.props.history.push("/home");
                });
            }
            // 401 == Unauthorized (incorrect username/password)
            else if (res.status === 401) {
                this.DisplayErrorMessage("Incorrect username or password");
            }
            // any other error
            else {
                res.json().then(data => {
                    if (data.message)
                        this.DisplayErrorMessage(data.message);    
                    else
                        this.DisplayErrorMessage("An error occured, please try again");
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
        <div className="LoginFormContainer">
            <BounceLoader loading={this.state.loading} color={LoadingSpinnerConfig.color} css={LoadingSpinnerConfig.css} size={LoadingSpinnerConfig.size} speedMultiplier={LoadingSpinnerConfig.speedMultiplier} />
            { this.state.loading ? <div style={{position: 'fixed', display: 'block', width: '100%', height: '100%', zIndex:2, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}/> : null }
            <form className="LoginForm" onSubmit={this.handleFormSubmit}>
                <label htmlFor="Username">
                    Username
                    <input type="text" name="Username" onChange={this.handleInputChange}/>
                </label>

                <label htmlFor="Password">
                    Password
                    <input type="password" name="Password" onChange={this.handleInputChange}/>
                </label>

                <div className="ErrorMessageContainer">
                    { this.state.showErrorMessage ? <ErrorMessage message={this.state.errorMessage}/> : null }
                </div>

                <input type="submit" value="Login"/>
            </form>

            <div>
                <label className="RegisterLinkLabel"> Don't have an account?</label>
                <Link to="/register" className="RegisterLink">Register</Link>
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

export default Login;
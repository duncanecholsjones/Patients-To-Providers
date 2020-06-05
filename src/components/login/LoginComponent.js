// Duncan Echols-Jones
// 4/3/2020
// React Login Component, used to render our Login page

import React from 'react';
import UserService from '../../services/UserService';
import './LoginComponentStyles.css'

class LoginComponent extends React.Component {

    state = {
        user: null,
        username: '',
        password: '',
        loginFailed: null
    }

    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
    }

    // Allow user to log in and create a session, encorporates check for correct user credentials
    handleLogin() {
        UserService.login({username: this.state.username, password: this.state.password})
        .then(user => {
            if (user) {
                this.props.history.push('/')
            } else {
                this.setState({loginFailed: true})
            }
        })
    }

    // Allows user to logout and destroy session
    handleLogout() {
        UserService.logout().then(response =>
            this.setState(prevState => ({
                user: {
                    ...{},
                    username: 'guest'
                }
            }))
        )
    }

    render() {
        return (
            <div className="container-fluid login-container">
                {/* Display logout button only if user is logged in */}
                { this.state.user &&
                <div className="row top-row">
                    <button onClick={() => this.handleLogout()} className="btn btn-secondary">Logout</button>
                    <h1>Logged in as {this.state.user.username}</h1>
                    </div>
                }
                <div className="jumbotron">
                    <a href="/">Home</a>
                    <h1 className="display-4">Log into your account</h1>
                    <p className="lead">Enter your username and password.</p>
                    {/* Check for user logging in with correct credentials */}
                    {
                        this.state.loginFailed === true && 
                        <div className="row fail-row">
                            <p>Username and/or password invalid</p>
                            </div>
                    }
                    <p className="lead">
                        <form>
                            <div className="form-group">
                                <label htmlFor="usernameInput">Username</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState({username: e.target.value})
                                    }}
                                    id="usernameInput" placeholder="Enter your username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordInput">Password</label>
                                <input type="password" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState({password: e.target.value})
                                    }}
                                    id="passwordInput" placeholder="Enter your password" />
                            </div>
                        </form>
                    </p>
                    <button onClick={() => this.handleLogin()} type="button" className="btn btn-success">Login</button>
                </div>
                
            </div>
        )
    }
}

export default LoginComponent
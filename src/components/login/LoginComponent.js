import React from 'react';
import UserService from '../../services/UserService';
import './LoginComponentStyles.css'

class LoginComponent extends React.Component {

    state = {
        user: {},
        username: '',
        password: '',
        loginFailed: null
    }

    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
    }

    handleLogin() {
        UserService.login({username: this.state.username, password: this.state.password})
        .then(response => {
            if (response) {
                this.props.history.push('/')
            } else {
                this.setState({loginFailed: true})
            }
        })
    }

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
            <div className="container-fluid">
                
                {this.state.user &&
                <div className="row top-row">
                    <a onClick={() => this.handleLogout()} className="btn btn-dark btn-lg" role="button">Logout</a>
                    <h1>Logged in as {this.state.user.username}</h1>
                    </div>
                }
                <div className="jumbotron">
                    <a href="/">Home</a>
                    <h1 className="display-4">Log into your account</h1>
                    <p className="lead">Enter your username and password.</p>
                    <p className="lead">
                        <form>
                            <div className="form-group">
                                <label for="usernameInput">Username</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState({username: e.target.value})
                                    }}
                                    id="usernameInput" placeholder="Enter your username" />
                            </div>
                            <div className="form-group">
                                <label for="passwordInput">Password</label>
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
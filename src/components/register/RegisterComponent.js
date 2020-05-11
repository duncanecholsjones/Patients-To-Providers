import React from 'react';
import UserService from '../../services/UserService'

class RegisterComponent extends React.Component {

    state = {
        user: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            role: 'PATIENT',
            username: '',
            password: '',
            confirmPassword: ''
        }
    }

    validatePasswords() {
        if (this.state.user.password !== this.state.user.confirmPassword) {
            document.getElementById("confirmPasswordField").innerHTML = "Passwords not matching!";
            return false;
        }
        document.getElementById("confirmPasswordField").innerHTML = "";
        return true;
    }

    registerUser() {
        this.validatePasswords()
        UserService.createUser(this.state.user).then(response => {
            console.log(response)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="jumbotron">
                    <a href="/">Home</a>
                    <h1 className="display-4">Register for RentMatch</h1>
                    <p className="lead">Enter your name, email, phone, and
                whether you are a renter or a landlord to get going.</p>
                    <p className="lead">
                        <form>
                            <div className="form-row">
                                <div className="col">
                                    <label for="firstNameInput">First name</label>
                                    <input type="text" id="firstNameInput"
                                        onChange={(e) => {
                                            e.persist()
                                            this.setState(prevState => ({
                                                user: {
                                                    ...prevState.user,
                                                    firstName: e.target.value
                                                }
                                            }))
                                        }}
                                        className="form-control" placeholder="First name" />
                                </div>
                                <div className="col">
                                    <label for="lastNameInput">Last name</label>
                                    <input type="text" id="lastNameInput"
                                        onChange={(e) => {
                                            e.persist()
                                            this.setState(prevState => ({
                                                user: {
                                                    ...prevState.user,
                                                    lastName: e.target.value
                                                }
                                            }))
                                        }}
                                        className="form-control" placeholder="Last name" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="emailInput">Email</label>
                                <input type="email" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                email: e.target.value
                                            }
                                        }))
                                    }}
                                    id="emailInput" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label for="phoneInput">Phone</label>
                                <input type="phone" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                phone: e.target.value
                                            }
                                        }))
                                    }}
                                    id="phoneInput" placeholder="Enter your phone number" />
                            </div>
                            <div className="row border" data-toggle="buttons">
                                <div className="col-2">
                                    <label>
                                        <input
                                            onChange={(e) => {
                                                e.persist()
                                                this.setState(prevState => ({
                                                    user: {
                                                        ...prevState.user,
                                                        role: e.target.value
                                                    }
                                                }))
                                            }}
                                            value="PATIENT" type="radio" name="options"
                                            id="option1" autocomplete="off" /> Patient
                                    </label>
                                </div>
                                <br />
                                <div className="col-2">
                                    <label>
                                        <input
                                            onChange={(e) => {
                                                e.persist()
                                                this.setState(prevState => ({
                                                    user: {
                                                        ...prevState.user,
                                                        role: e.target.value
                                                    }
                                                }))
                                            }}
                                            value="PROVIDER" type="radio" name="options"
                                            id="option2" autocomplete="off" /> Provider
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="usernameInput">Username</label>
                                <input type="text" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                username: e.target.value
                                            }
                                        }))
                                    }}
                                    id="usernameInput" placeholder="Enter your username" />
                            </div>
                            <div className="form-group">
                                <label for="passwordInput">Password</label>
                                <input type="password" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        let newValue = e.target.value
                                        this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                password: newValue
                                            }
                                        }))
                                    }}
                                    id="passwordInput" placeholder="Enter your password" />
                            </div>
                            <p id="confirmPasswordField"></p>
                            <div className="form-group">
                                <label for="confirmInput">Confirm Password</label>
                                <input type="password" className="form-control"
                                    onChange={(e) => {
                                        e.persist()
                                        let newValue = e.target.value
                                        this.setState(prevState => ({
                                            user: {
                                                ...prevState.user,
                                                confirmPassword: newValue
                                            }
                                        }))
                                    }}
                                    id="confirmInput" placeholder="Confirm your password" />
                            </div>
                        </form>
                    </p>
                    <button onClick={() => this.registerUser()} type="button" className="btn btn-success">Register</button>
                </div>
            </div>
        )
    }
}

export default RegisterComponent
import React from 'react';
import UserService from '../../services/UserService';

class HomeComponent extends React.Component {


    state = {
        user: {
            username: 'guest'
        }
    }

    // Need to use redux more here and add the user profile to the state w/ actions and reducers
    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
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
                <div className="jumbotron">
                    {this.state.user &&
                        <a onClick={() => this.handleLogout()} className="btn btn-dark btn-lg" role="button">Logout</a>
                    }
                    <h1 className="display-4">Hello, {this.state.user.username}</h1>
                    <p className="lead">Welcome to Patients To Providers!</p>
                    <hr className="my-4" />
                    <p>We are a platform that connects patients with providers who specialize in their conditions as well as other patients who suffer from those same conditions.</p>
                    <p>In this way, a patient can get support more easily than ever before.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>
                        <a className="btn btn-warning btn-lg" href="/login" role="button">Login</a>
                        <a className="btn btn-success btn-lg" href="/search" role="button">Search a condition</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default HomeComponent
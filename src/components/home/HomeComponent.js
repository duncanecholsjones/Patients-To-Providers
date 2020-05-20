import React from 'react';
import UserService from '../../services/UserService';
import './HomeComponentStyles.css';

class HomeComponent extends React.Component {


    state = {
        user: {}
    }

    // Need to use redux more here and add the user profile to the state w/ actions and reducers
    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
        this.playVideo()
    }

    playVideo() {
        // Get the video
        var video = document.getElementById("myVideo");
        video.play();
    }

    handleLogout() {
        UserService.logout().then(response =>
            this.setState(prevState => ({
                user: {}
            }))
        )
    }

    render() {
        return (
            <div className="container">
                {/* Source: https://www.w3schools.com/howto/howto_css_fullscreen_video.asp */}
                <div className="fullscreen-bg">
                    <video loop muted autoPlay className="fullscreen-bg__video" id="myVideo">
                        <source src={require('./patientvideo.mp4')} type="video/webm" />
                    </video>
                </div>

                <div className="jumbotron">
                    

                    {
                        this.state.user.username &&
                        <div className="row">
                            <button onClick={() => this.handleLogout()} className="btn btn-secondary">Logout</button>
                            <h1>Logged in as {this.state.user.username}</h1>
                        </div>
                    }
                    <hr className="my-4"></hr>
                    {
                        this.state.user.username &&
                        <h1 className="display-4">Hello, {this.state.user.firstName}!</h1>
                    }
                    {
                        !this.state.user.username &&
                        <h1 className="display-4">Hello, Guest!</h1>
                    }
                    <p className="lead">Welcome to Patients To Providers!</p>
                    <hr className="my-4" />
                    <p>We are a platform that connects patients with providers who specialize in their conditions as well as other patients who suffer from those same conditions.</p>
                    <p>In this way, a patient can get support more easily than ever before.</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/register" role="button">Register</a>
                        <a className="btn btn-warning btn-lg" href="/login" role="button">Login</a>
                        <a className="btn btn-success btn-lg" href="/search" role="button">Search a condition</a>
                        {
                            this.state.user.username &&
                            <a className="btn btn-info btn-lg" href="/profile" role="button">Go to profile</a>
                        }
                    </p>
                </div>
            </div>
        )
    }
}

export default HomeComponent
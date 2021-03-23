// Duncan Echols-Jones
// 2/18/2021
// React VisitOtherProfile Component, used to render our OtherProfile component, giving us details about
// another user's information

import React from 'react';
import UserService from '../services/UserService';
import MessageService from '../services/MessageService';

class VisitOtherProfileComponent extends React.Component {

    state = {
        user: {},
        otherProfile: {}
    }

    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => this.setState({ user: actualUser }))
        UserService.getOtherUserProfile(this.props.otherProfileId).then(actualOtherUser => this.setState({ otherProfile: actualOtherUser }))
    }

    sendMessage() {
        var messageText = document.getElementById('messageForm').value
        var message = {}
        message['fromUserId'] = this.state.user.userId
        message['toUserId'] = this.state.otherProfile.userId
        message['messageText'] = messageText
        MessageService.sendMessage(message)
    }

    render() {
        return (
            <div className="container-fluid">
                {!this.state.user.username &&
                    <div className="unlogged-message">
                        <h5>You are not logged in. <a href="/login">Go to login</a></h5>
                    </div>
                }
                {this.state.user.username &&
                    <div>
                        <div className="row">
                            <button onClick={() => this.handleLogout()} className="btn btn-secondary">Logout</button>
                            <h1>Logged in as {this.state.user.username}</h1>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="jumbotron">
                                    <h1 className="display-4">{this.state.otherProfile.username}'s Profile</h1>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <div className="card profile-card">
                                                <img className="card-img-top" src={require('../../src/profile/emptyprofile.png')} alt="Not found" />
                                                <hr className="my-4" />
                                                <h5 className="card-title"> {this.state.otherProfile.firstName} {this.state.otherProfile.lastName}</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <p className="lead">Name: {this.state.otherProfile.firstName} {this.state.otherProfile.lastName}</p>
                                            <p className="lead">Email: {this.state.otherProfile.email}</p>
                                            <p className="lead">Phone: {this.state.otherProfile.phone}</p>
                                            <p className="lead">User type: {this.state.otherProfile.role}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-6">
                                <div className="jumbotron message-div">
                                    {this.state.user.userId === this.state.otherProfile.userId &&
                                        <p className="lead">This is your profile.</p>
                                    }
                                    {this.state.user.userId !== this.state.otherProfile.userId &&
                                        <div>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="messageForm">Message {this.state.otherProfile.firstName}</label>
                                                    <textarea className="form-control" id="messageForm" rows="3"></textarea>
                                                </div>
                                            </form>
                                            <button onClick={() => this.sendMessage()} className="btn btn-success">Send</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default VisitOtherProfileComponent
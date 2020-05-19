import React from 'react';
import UserService from '../services/UserService';
import MessageService from '../services/MessageService';
import MessageComponent from '../components/messages/MessageComponent';
import './ProfileComponentStyles.css';

class ProfileComponent extends React.Component {

    state = {
        user: {},
        incomingMessages: [],
        sentMessages: [],
        showIncoming: false,
        showSent: false
    }

    componentDidMount() {
        UserService.getLoggedInUser().then(actualUser => {
            this.setState({ user: actualUser })
            MessageService.getIncomingMessages(this.state.user.userId)
                .then(actualMessages => this.setState({ incomingMessages: actualMessages }))
            MessageService.getOutgoingMessages(this.state.user.userId)
                .then(actualMessages => this.setState({ sentMessages: actualMessages }))
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sentMessages !== this.state.sentMessages) {
            MessageService.getOutgoingMessages(this.state.user.userId)
                .then(actualMessages => this.setState({ sentMessages: actualMessages }))
        }
    }

    sendMessage = (fromUserId, toUserId, messageText) => {
        var message = {}
        message['fromUserId'] = fromUserId
        message['toUserId'] = toUserId
        message['messageText'] = messageText
        MessageService.sendMessage(message)
    }

    toggleIncoming() {
        this.setState({ showIncoming: !this.state.showIncoming })
    }

    toggleSent() {
        this.setState({ showSent: !this.state.showSent })
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
                                    <h1 className="display-4">Your Profile</h1>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <div className="col-sm-7">
                                            <div className="card profile-card">
                                                <img className="card-img-top" src={require('../../src/profile/emptyprofile.png')} alt="Not found" />
                                                <hr className="my-4" />
                                                <h5 className="card-title"> {this.state.user.firstName} {this.state.user.lastName}</h5>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <p className="lead">Name: {this.state.user.firstName} {this.state.user.lastName}</p>
                                            <p className="lead">Email: {this.state.user.email}</p>
                                            <p className="lead">Phone: {this.state.user.phone}</p>
                                            <p className="lead">User type: {this.state.user.role}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-4">
                                <div className="jumbotron message-center-jumbotron">
                                    <div className="row">
                                        <h4>Message Center</h4>
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <button onClick={() => this.toggleIncoming()} type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            View incoming messages
                                        </button>
                                        {this.state.showIncoming &&
                                            <ul className="container-fluid incoming-message-div">
                                                {
                                                    this.state.incomingMessages.map((message, index) => {
                                                        return <MessageComponent
                                                            key={message.id}
                                                            userId={this.state.user.userId}
                                                            message={message}
                                                            sendMessage={this.sendMessage}
                                                        />
                                                    })
                                                }
                                            </ul>
                                        }
                                    </div>
                                    <hr className="my-4" />
                                    <div className="row">
                                        <button onClick={() => this.toggleSent()} type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            View sent messages
                                        </button>
                                        {this.state.showSent &&
                                            <ul className="container-fluid sent-message-div">
                                                {
                                                    this.state.sentMessages.map((message, index) => {
                                                        return <MessageComponent
                                                            key={message.id}
                                                            userId={this.state.user.userId}
                                                            message={message}
                                                            sendMessage={this.sendMessage}
                                                        />
                                                    })
                                                }
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )


    }

}

export default ProfileComponent
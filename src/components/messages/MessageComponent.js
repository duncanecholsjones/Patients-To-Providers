import React from 'react';
import './MessageComponentStyles.css';


class MessageComponent extends React.Component {

    state = {
        replyMode: false
    }

    handleMessageSend() {
        this.props.sendMessage(this.props.userId, 
            this.props.message.senderInfo.userId, 
            document.getElementById('messageForm').value)
        this.setState({replyMode: false})
    }

    handleReplyMode() {
        this.setState({ replyMode: true })
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.message.senderInfo &&
                    <div className="card">
                        <div className="card-header">
                            From <a href={`/profile/${this.props.message.senderInfo.userId}`}>
                                {this.props.message.senderInfo.username}
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{this.props.message.messageText}</p>
                            {!this.state.replyMode &&
                                <button onClick={() => this.handleReplyMode()} className="btn btn-primary">Reply</button>
                            }
                            {
                                this.state.replyMode &&
                                <div>
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control" id="messageForm" rows="3"></textarea>
                                        </div>
                                    </form>
                                    <button onClick={() => this.handleMessageSend()}
                                        className="btn btn-success">Send</button>
                                </div>
                            }
                        </div>
                    </div>
                }
                {
                    this.props.message.recipientInfo &&
                    <div className="card">
                        <div className="card-header">
                            Sent to <a href={`/profile/${this.props.message.recipientInfo.userId}`}>
                                {this.props.message.recipientInfo.username}
                            </a>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{this.props.message.messageText}</p>
                        </div>
                    </div>
                }

            </React.Fragment>
        )
    }
}

export default MessageComponent
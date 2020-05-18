import React from 'react';
import './MessageComponentStyles.css'

class MessageComponent extends React.Component {


    render() {
        return (
            <React.Fragment>
                {
                    this.props.message.senderInfo &&
                    <div class="card">
                        <div class="card-header">
                            From {this.props.message.senderInfo.username}
                        </div>
                        <div class="card-body">
                            <p class="card-text">{this.props.message.messageText}</p>
                            <a href="#" class="btn btn-primary">Reply</a>
                        </div>
                    </div>
                }
                {
                    this.props.message.recipientInfo &&
                    <div class="card">
                        <div class="card-header">
                            Sent to {this.props.message.recipientInfo.username}
                        </div>
                        <div class="card-body">
                            <p class="card-text">{this.props.message.messageText}</p>
                        </div>
                    </div>
                }

            </React.Fragment>
        )
    }
}

export default MessageComponent
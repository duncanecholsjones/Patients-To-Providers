// Duncan Echols-Jones
// 2/18/2021
// REST API endpoints for Messages

const sendMessage = (message) =>
    fetch(`http://localhost:8181/api/sendMessage`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(response => response.json())

const getIncomingMessages = (userId) =>
    fetch(`http://localhost:8181/api/users/${userId}/messages/incoming`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json())

const getOutgoingMessages = (userId) =>
    fetch(`http://localhost:8181/api/users/${userId}/messages/outgoing`, {
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json())

export default {
    sendMessage,
    getIncomingMessages,
    getOutgoingMessages
}
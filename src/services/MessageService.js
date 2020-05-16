const sendMessage = (message) =>
    fetch(`http://localhost:8181/api/sendMessage`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    }).then(response => response.json())

export default {
    sendMessage
}
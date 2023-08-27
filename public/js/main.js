

// all this is referenced by the chat.html file
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// parsing the user and the room through the url. 
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// creates a connection to the server. 
const socket = io();


// This sends a 'joinRoom' event to the server, with an object containing the 
// username and room as data.
socket.emit('joinRoom', { username, room });


// to get room and users info. from the server by listening on the 'roomUsers' event. 
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// to pass the message to the outputMessage function. 
socket.on('message', message => {
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})


// emit the message and clear the input text box. 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();     

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    // to the clear out the input and also focus on the input box, once a message has been sent 
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// output message to the main window where client can see it   
function outputMessage(message) {

    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// add room name to DOM, in the side bar 
function outputRoomName(room) {
    roomName.innerText = room;
}

// to add users in the side bar to show the list the users present in the current room 
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}
// in this we are mapping through the array and for each user we make a <li> of that user
// and then this join method will return a single string in the userList without any spaces. 


const users = [];

// to join the current user to the users array 
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

// to get the current user, by finding the user with the given id 
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}


// to get the given room users, we do this by filtering all the users that have the the same room associated with them as the room passed in the function. 
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}


// to get the user that leaves the chat 
function userLeave(id) {
    const index = users.findIndex(user => user.id === id); 

    if (index !== -1) {
        return users.splice(index, 1)[0];    
    }
}


module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}
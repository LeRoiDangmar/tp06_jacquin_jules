const fs = require('fs').promises;
const path = require('path');

// Initialize the users variable
let users = [];

/**
 * Asynchronously reads the JSON file and updates the users variable.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<void>}
 */
async function updateUsers(filePath) {
    try {
        // Read the file contents
        const data = await fs.readFile(filePath, 'utf-8');
        
        // Parse the JSON data
        const parsedData = JSON.parse(data);
        
        // Validate that the parsed data is an array
        if (!Array.isArray(parsedData)) {
            throw new Error('JSON content is not an array.');
        }
        
        // Update the users variable
        users = parsedData;
        
        console.log('Users have been updated successfully.');
    } catch (error) {
        console.error('Error updating users:', error.message);
    }
}

/**
 * Retrieves the current users array.
 * @returns {Array} The users array.
 */
function getUsers() {
    return users;
}

async function addUser(filePath, newUser) {
    try {
        // Validate newUser object
        if (!newUser || typeof newUser !== 'object') {
            throw new Error('Invalid user data. Expected an object.');
        }

        if (!newUser.name || typeof newUser.name !== 'string') {
            throw new Error('User must have a valid "name" property.');
        }

        // Generate a unique ID
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
        console.log( "L'id généré est ", newId, " ", users.length);
        const userToAdd = { id: newId, name: newUser.name, password: newUser.password };

        // Append the new user to the users array
        const updatedUsers = [...users, userToAdd];

        // Write the updated array back to the JSON file
        await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 4), 'utf-8');

        // Update the in-memory users variable
        users = updatedUsers;

        console.log(`User "${userToAdd.name}" added successfully with ID ${userToAdd.id}.`);
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
}

async function updateUser(id){
    
}

module.exports = { updateUsers, getUsers, addUser };
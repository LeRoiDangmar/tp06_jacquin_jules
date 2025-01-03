const fs = require('fs').promises;
const path = require('path');

// Initialize the products variable
let products = [];
let categories = [];

/**
 * Asynchronously reads the JSON file and updates the products variable.
 * @param {string} filePath - The path to the JSON file.
 * @returns {Promise<void>}
 */
async function updateProducts(filePath) {
    try {
        // Read the file contents
        const data = await fs.readFile(filePath, 'utf-8');
        
        // Parse the JSON data
        const parsedData = JSON.parse(data);
        
        // Validate that the parsed data is an array
        if (!Array.isArray(parsedData)) {
            throw new Error('JSON content is not an array.');
        }
        
        // Update the products variable
        products = parsedData;
        
        console.log('Products have been updated successfully.');
    } catch (error) {
        console.error('Error updating products:', error.message);
    }
}


async function updateCategories(filePath) {
    try {
        // Read the file contents
        const data = await fs.readFile(filePath, 'utf-8');
        
        // Parse the JSON data
        const parsedData = JSON.parse(data);
        
        // Validate that the parsed data is an array
        if (!Array.isArray(parsedData)) {
            throw new Error('JSON content is not an array.');
        }
        
        // Update the products variable
        categories = parsedData;
        
        console.log('Categories have been updated successfully.');
    } catch (error) {
        console.error('Error updating categories:', error.message);
    }
}

/**
 * Retrieves the current products array.
 * @returns {Array} The products array.
 */
function getProducts() {
    return products;
}

function getCategories() {
    return categories;
}


module.exports = { updateProducts, updateCategories, getProducts, getCategories };
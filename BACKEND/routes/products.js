const express = require('express');
require('dotenv').config();
const path = require('path');
const router = express.Router();
const { updateProducts, updateCategories, getProducts, getCategories } = require('../includes/productsManager')

const ProductJsonFilePath = path.join("./mock_data/", 'produit.json');
const CategoriesJsonFilePath = path.join("./mock_data/", 'categories.json');
async function init() {
    // Initial load of products
    await updateProducts(ProductJsonFilePath);
    await updateCategories(CategoriesJsonFilePath);

}

router.get('/getProducts', (req, res) => {
    res.json(getProducts())
})

router.get('/getCategories', (req, res) => {
    res.json(getCategories())
})

init();

module.exports = router;
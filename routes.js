const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const contactController = require('./src/controllers/contactController');

//home routes
routes.get('/', homeController.homePage);
routes.post('/', homeController.homePagePost);

//contact routes
routes.get('/contact', contactController.homePage);

module.exports = routes;

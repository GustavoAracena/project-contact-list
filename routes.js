const express = require('express');
const routes = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');

const { loginRequired } = require('./src/middlewares/middleware');

// home routes
routes.get('/', homeController.index);

// login routes
routes.get('/login/index', loginController.index);
routes.post('/login/register', loginController.register);
routes.post('/login/login', loginController.login);
routes.get('/login/logout', loginController.logout);

// contact routes
routes.get('/contact/index', loginRequired, contactController.index);
routes.post('/contact/register', loginRequired, contactController.register);
routes.get('/contact/index/:id', loginRequired, contactController.editIndex);
routes.post('/contact/edit/:id', loginRequired, contactController.edit);

module.exports = routes;

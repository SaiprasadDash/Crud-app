const express = require('express');
const route = express.Router()

const services = require('../services/render')

//Root route

route.get('/', services.homeRoutes);

//Add user

route.get('/add-user', services.add_user);

//Update user

route.get('/update-user', services.update_user);

module.exports = route;
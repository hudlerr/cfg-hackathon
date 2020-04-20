const express = require('express');
const path = require('path');
const { Router } = express; //Here we destructure (ES6) the Router value off of express
const router = Router();
const queries = require('./queries');

// =========================================================
// Routes
// =========================================================

//Handles the route for the home path
router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

//Handles the route for the dashboard path
router.get('/my-dashboard', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'dashboard.html'));
});

//Handles the route for the signup path
router.get('/create-user', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'create-user.html'));
});

//Handles the route for the login path
router.get('/login', function(request, response) {

    response.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
});

module.exports = router;
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { Router } = express; //Here we destructure (ES6) the Router value off of express
const router = Router();
const queries = require('./queries');

let postcode; //global postcode var

//Handles route for dashboard
router.get('/my-dashboard', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'dashboard.html'));
});

//Helper method - handles get user neighbourhood request
router.get('/neighbourhood', function(request, response) {
    console.log("From /neighbourhood req");
    var postcodeAPIURL = "https://api.postcodes.io/postcodes/" + postcode;
    fetch(postcodeAPIURL)
        .then(response => response.json())
        .then(data => {
            //data = JSON.parse(JSON.stringify(data));
            console.log("passed on " + data.result['admin_ward']);
            response.json({ ward: data.result['admin_ward'] });
        })
        .catch(error => console.log('error:', error));
});

//Handles post form in dashboard.js
router.post('/dashboard', function(request, response) {
    console.log("From post req" + request.body.postcode);
    postcode = request.body.postcode
    if (postcode.length < 5) { //TODO: This should be done client side
        response.redirect('/error');
    } else {
        response.redirect('/my-dashboard');
    }
});

//Handles the route for the home path
router.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

//Handles the route for the signup path
router.get('/create-user', function(request, response) {
    response.sendFile(path.join(__dirname, '..', '..', 'public', 'create-user.html'));
});

//Handles the route for the login path
router.get('/login', function(request, response) {

    response.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
});

//Handles the route for the error path
router.get('/error', function(request, response) {
    response.writeHead(404, { 'content-type': 'text/html' });
    response.end('<h1>Ooops somethings broken ...</h1>');
});

module.exports = router;
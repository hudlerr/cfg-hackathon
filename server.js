const express = require('express');
const path = require('path');
const port = 7000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

/*Handles the route for the home path*/
app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

/*Handles the route for the dashboard path*/
app.get('/my-dashboard', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'dashboard.html'))
});

app.listen(port);
console.log("Server started on port: " + port);
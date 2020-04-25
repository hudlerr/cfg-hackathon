const dbConnection = require('../../db_server/db_connection');
const fetch = require('node-fetch');

const addNewUser = user => {
    // This makes a database query, that returns an id, however, it returns an array of one, so then it is converted to just the id (as an object)
    const { fullname, email, password, phonenumber, postcode } = user;
    return dbConnection.query(
        `INSERT INTO users(fullname, email, password, phonenumber, postcode) VALUES($1,$2,$3,$4,$5) RETURNING id`, [fullname, email, password, phonenumber, postcode]
    );
};

const addNewTask = userDetails => {
    const { ownerId, neighbourhoodId, titleContent, descriptionContent } = userDetails;
    return dbConnection.query(
        `INSERT INTO tasks(ownerId, neighbourhoodId, titleContent, descriptionContent) VALUES($1,$2,$3,$4)`, [ownerId, neighbourhoodId, titleContent, descriptionContent]
    );
}

module.exports = {
    addNewUser,
    addNewTask
}
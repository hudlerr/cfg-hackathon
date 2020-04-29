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
    const { ownerId, ownernumber, ownername, neighbourhoodId, titleContent, descriptionContent } = userDetails;
    return dbConnection.query(
        `INSERT INTO tasks(ownerId, ownernumber, ownername, neighbourhoodId, titleContent, descriptionContent) VALUES($1,$2,$3,$4,$5,$6)`, [ownerId, ownernumber, ownername, neighbourhoodId, titleContent, descriptionContent]
    );
}

const setTaskAccepted = accepetedTask => {
    const { repliedtouserid, repliedtousername, repliedtousernumber, taskid } = accepetedTask;
    return dbConnection.query(
        `UPDATE tasks SET repliedtouserid=($1), repliedtousername=($2), repliedtousernumber=($3)  where taskid=($4)`, [repliedtouserid, repliedtousername, repliedtousernumber, taskid]
    );
}

module.exports = {
    addNewUser,
    addNewTask,
    setTaskAccepted
}
const db = require('../../db_server/db_connection');
const fetch = require('node-fetch');

const getUserById = id => {
    const { id: usersId } = id; //id is returned as an object from addFacster
    return db.query(`SELECT * FROM users WHERE users.id = $1`, usersId);
};

module.exports = {
    getUserById,
}
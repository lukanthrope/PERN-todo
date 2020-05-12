const Pool = require('pg').Pool;
const { USER, PASSWORD } = require('./dbconfig');

const pool = new Pool({
    user: USER,
    password: PASSWORD,
    port: 5432,
    database: "todos",
});

module.exports = pool;
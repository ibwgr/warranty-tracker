const mariadb = require('mariadb');
let config = {};
if ( process.env.CI === true ){
    config = {
        user: "root",
        port: 3306,
        database: "warrantydb",
        connectionLimit: 5
    }
} else {
    config = {
        user: "root",
        password: process.env.DATABASE_PASSWORD != null ? process.env.DATABASE_PASSWORD  : 'ibwsa3',
        port: process.env.DATABASE_PORT != null ? process.env.DATABASE_PASSWORD : 3333,
        database: process.env.DATABASE != null ? process.env.DATABASE : "warrantydb",
        connectionLimit: 5
    }
}

const pool = mariadb.createPool({
    user: "root",
    password: "ibwsa3",
    port: 3333,
    database: "warrantydb",
    connectionLimit: 5
});

async function getDataByQuery(query, callback, queryValues) {
    let conn;
    try {
        if (queryValues === undefined) {
            queryValues = '';
        }
        conn = await pool.getConnection();
        const data = await conn.query(query, queryValues);
        data.forEach(addOneHourToUTCTimezone);
        return callback(data);

    } catch (err) {
        throw err;

    } finally {
        if (conn) {
            return conn.end();
        }
    }
}

async function changeDataByQuery(query, queryValues) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(query, queryValues);

    } catch (err) {
        throw err;

    } finally {
        if (conn) {
            return conn.end();
        }
    }
}

function addOneHourToUTCTimezone(warrantyEntry){
    warrantyEntry.date_.setHours(warrantyEntry.date_.getHours() + 1);
}

module.exports = {
    getDataByQuery,
    changeDataByQuery,
    addOneHourToUTCTimezone
};

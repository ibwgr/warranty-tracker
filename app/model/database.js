const mariadb = require('mariadb');
const pool = mariadb.createPool({
    user: "root",
    //password: "ibwsa3",
    port: 3306,
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

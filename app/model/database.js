const mariadb = require('mariadb');
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

module.exports = {
    getDataByQuery,
    changeDataByQuery
};
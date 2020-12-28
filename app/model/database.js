const mariadb = require('mariadb');
const pool = mariadb.createPool({
    user: "root",
    password: "ibwsa3",
    port: 3333,
    database: "warrantydb",
    connectionLimit: 5
});

async function getDataByQuery(query, callback) {
    let conn;
    try {
        conn = await pool.getConnection();
        const data = await conn.query(query);
        return callback(data);

    } catch (err) {
        throw err;

    } finally {
        if (conn) {
            return conn.end();
        }
    }
}

async function changeDataByQuery(query) {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(query, function (err, result) {
            if (err) throw err;
        });

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
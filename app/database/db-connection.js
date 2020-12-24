const mariadb = require('mariadb');

const pool = mariadb.createPool({
    user: "root",
    password: "ibwsa3",
    port: 3333,
    database: "warrantydb",
    connectionLimit: 5
});

async function testData() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('connected');

        const sql = `INSERT INTO warranty (date, machine, customer, contact, issue, employee, time)
                     VALUES ('2020-04-12', 'Master250', 'CCL USA', 'M. Muster', 'Download Update', 'S. Huttera',
                             '20:00:00')`;

        await conn.query(sql, function (err, result) {
            if (err) throw err;
        });

        const rows = await conn.query('Select * from warranty');
        console.log(rows);

    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            return conn.end();
        }
    }
}

module.exports = {
    testData
}
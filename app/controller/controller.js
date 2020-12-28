const database = require('../model/database.js');

const getDataForTheLast12Month = async (req, res) => {
    try {
        const query = `SELECT * FROM warranty
                       WHERE date_ >= CURDATE() - INTERVAL 12 MONTH`

        await database.getDataByQuery(query, function(result) {
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const getDataForTheCurrentMonth = async (req, res) => {
    try {
        const query = `SELECT * FROM warranty
                       WHERE date_ BETWEEN DATE_FORMAT(NOW() ,'%Y-%m-01') AND NOW()`;

        await database.getDataByQuery(query, function(result) {
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const getDataAccordingToDateSelection = async (req, res) => {
    try {
        const query = `SELECT * FROM warranty
                       WHERE date_ BETWEEN ${req.body.dateFrom} AND ${req.body.dateTo}`;

        await database.getDataByQuery(query, function(result) {
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const addWarrantyEntry = async (req, res) => {
    try {
        const query = `INSERT INTO warranty (date_, machine, customer, contact, issue, employee, time_)
                       VALUES
                       ('${req.body.date_}', '${req.body.machine}', '${req.body.customer}', '${req.body.contact}',
                        '${req.body.issue}', '${req.body.employee}', '${req.body.time_}')`;

        await database.changeDataByQuery(query);
        res.end();
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const deleteWarrantyEntry = async (req, res) => {
    try {
        const query = `DELETE * FROM warranty
                       WHERE id = ${req.body.id}`;

        await database.changeDataByQuery(query);
        res.end();
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

module.exports = {
    getDataForTheLast12Month,
    getDataForTheCurrentMonth,
    getDataAccordingToDateSelection,
    addWarrantyEntry,
    deleteWarrantyEntry
}

const database = require('../model/database.js');

const getDataForTheLast12Month = async (req, res) => {
    try {
        const query = `SELECT * FROM warranty
                       WHERE date_ >= CURDATE() - INTERVAL 12 MONTH`;

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
                       WHERE date_ BETWEEN ? AND ?`;
        //Todo: How do I get dateFrom and dateTo from Front-End? --> /warranty/date-selection/?
        const queryValues = '';

        await database.getDataByQuery(query, function(result) {
            res.send(result);
        }, queryValues);
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const addWarrantyEntry = async (req, res) => {
    try {
        const queryAddEntry = `INSERT INTO warranty (date_, machine, customer, contact, issue, employee, time_) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const queryValues = Object.values(req.body);
        await database.changeDataByQuery(queryAddEntry, queryValues);

        const queryGetLatestId = `SELECT MAX(id) FROM warranty`
        await database.getDataByQuery(queryGetLatestId, function(result) {
            res.send(result);
        });
    } catch (e) {
        console.log(e);
        throw new Error(e.message);
    }
}

const deleteWarrantyEntry = async (req, res) => {
    try {
        const query = `DELETE FROM warranty WHERE id = ?`;
        const queryValue = req.body.id;

        await database.changeDataByQuery(query, queryValue);
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
};

const assert = require('assert')
const database = require('../../../app/model/database');

describe('database', function () {
    describe('addOneHourToUTCTimezone', function () {
            it('1 hour will be added to used date', function () {
                const testDate = [{date_: new Date()}];
                const testDate1HourLater = new Date().setHours(new Date().getHours() + 1);

                testDate.forEach(database.addOneHourToUTCTimezone);
                const result = testDate[0].date_.valueOf();
                assert.strictEqual(result, testDate1HourLater);
            });
    })
})
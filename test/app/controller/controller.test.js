const assert = require('assert')
const controller = require('../../../app/controller/controller');

describe('controller', function () {
    describe('getDataForTheLast12Month()', function () {
        describe('with empty array', function () {
            it('should return empty object', function () {
                const result = controller.getDataForTheLast12Month()
                assert.strictEqual(result, undefined);

            });
        })
    })
})
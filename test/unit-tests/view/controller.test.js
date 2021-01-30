const assert = require('assert')
const chai = require('chai'), spies = require('chai-spies')
const expect = chai.expect;
const sinon = require("sinon");

chai.use(spies);

import Controller from '../../../view/scripts/controller'
import Data from '../../../view/scripts/data.remote'
import View from '../../../view/scripts/view'




describe('controller', function () {

    const fakeDataSorted = [
        {
            date_: new Date('2020-12-14'),
            machine: 'Master250',
            customer: 'CCL USA',
            contact: 'M. Muster',
            issue: 'TestData',
            employee: 'Employee 1',
            time_: '5:30:00'
        },
        {
            date_: new Date('2021-01-01'),
            machine: 'Master250',
            customer: 'CCL USA',
            contact: 'M. Muster',
            issue: 'TestData',
            employee: 'Employee 1',
            time_: '5:30:00'
        }
    ];

    const fakeDataUnsorted = [
        {
            date_:new Date('2021-01-01'),
            machine: 'Master250',
            customer: 'CCL USA',
            contact: 'M. Muster',
            issue: 'TestData',
            employee: 'Employee 1',
            time_: '5:30:00'
        },
        {
            date_:new Date('2020-12-14'),
            machine: 'Master250',
            customer: 'CCL USA',
            contact: 'M. Muster',
            issue: 'TestData',
            employee: 'Employee 1',
            time_: '5:30:00'
        }
    ];

    beforeEach(function(){
        this.view = sinon.createStubInstance(View);
        this.data = sinon.createStubInstance(Data);
        this.data.getWarrantyEntriesOfLastTwelveMonths = sinon.stub().returns(fakeDataSorted);
        this.data.getWarrantyEntriesOfCurrentMonth = sinon.stub().returns(fakeDataSorted);
        this.controller = new Controller(this.view, this.data);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('loadAndRender()', function () {

        it('should call getWarrantyEntriesOfCurrentMonth() once', async function () {

            await this.controller.loadAndRender();

            expect(this.data.getWarrantyEntriesOfCurrentMonth.calledOnce).to.be.true;
        });

        it('should call getWarrantyEntriesOfLastTvelweMonths() once', async function () {

            await this.controller.loadAndRender();

            expect(this.data.getWarrantyEntriesOfLastTwelveMonths.calledOnce).to.be.true;
        });

        it('should call renderList() once', async function() {
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();

            expect(this.view.renderList.calledOnce).to.be.true;
        });

        it('should call renderList() twice', async function() {
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();
            await this.controller.loadAndRender();

            expect(this.view.renderList.calledTwice).to.be.true;
        });


        it('should call renderList() with correct data', async function() {
            this.view.renderList = sinon.stub();

            await this.controller.loadAndRender();

            expect(this.view.renderList.calledOnce).to.be.true;
            expect(this.view.renderList.getCall(0).args[0] === fakeDataSorted).to.be.true;
        });

        it('should call renderList() with correct sorted data', async function() {
            this.data.getWarrantyEntriesOfCurrentMonth = sinon.stub().returns(fakeDataUnsorted);
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();
            const expectedDate = fakeDataSorted[0].date_;

            expect(this.view.renderList.calledOnce).to.be.true;
            assert.strictEqual((this.view.renderList.getCall(0).args[0][0].date_),expectedDate )
        });

        it('should call renderError() with correct message', async function() {
            const errorMessage = {"msg":"expected message"};
            this.data.getWarrantyEntriesOfCurrentMonth = sinon.stub().throws(errorMessage);
            this.view.renderError = sinon.spy();

            await this.controller.loadAndRender();

            expect(this.view.renderError.calledOnce).to.be.true;
            assert.strictEqual(this.view.renderError.getCall(0).args[0],errorMessage.msg);
        });
    })

    describe('getWorkingHoursPerMonths()', function () {
        it('should return most recent month', function() {
            const expectedMonth = "Jan 2021";

            const workingHoursPerMonths = this.controller.getWorkingHoursPerMonths(fakeDataUnsorted);
            const mostRecentMonth = workingHoursPerMonths.months[11];

            assert.strictEqual(mostRecentMonth,expectedMonth);
        });

        it('should return most passed month', function() {
            const expectedMonth = "Feb 2020";

            const workingHoursPerMonths = this.controller.getWorkingHoursPerMonths(fakeDataUnsorted);
            const mostPassedMonth = workingHoursPerMonths.months[0];

            assert.strictEqual(mostPassedMonth,expectedMonth);
        });
    })

    describe('getMonthNameAndYear()', function () {
        it('should return correct acronym of month', function() {
            const expectedAcronym = "Jan"

            const monthNameAndYear = this.controller.getMonthNameAndYear(new Date('2021-01-01'));

            assert.strictEqual(monthNameAndYear.split(" ")[0],expectedAcronym);
        });
    })

})
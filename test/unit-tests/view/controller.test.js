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
        this.data = new Data("http://localhost:3000");
        this.controller = new Controller(this.view, this.data);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('loadAndRender()', function () {

        it('should call data once', async function () {
            const stub = sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeDataSorted);

            await this.controller.loadAndRender();

            expect(stub.calledOnce).to.be.true;
        });

        it('should call renderList() once', async function() {
            sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeDataSorted);
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();

            expect(this.view.renderList.calledOnce).to.be.true;
        });

        it('should call renderList() twice', async function() {
            sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeDataSorted);
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();
            await this.controller.loadAndRender();

            expect(this.view.renderList.calledTwice).to.be.true;
        });

        it('should call renderList() with correct data', async function() {
            sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeDataSorted);
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();

            expect(this.view.renderList.calledOnce).to.be.true;
            expect(this.view.renderList.getCall(0).args[0] === fakeDataSorted).to.be.true;
        });

        it('should call renderList() with correct sorted data', async function() {
            sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeDataUnsorted);
            this.view.renderList = sinon.spy();

            await this.controller.loadAndRender();
            const expectedDate = fakeDataSorted[0].date_;

            expect(this.view.renderList.calledOnce).to.be.true;
            assert.strictEqual((this.view.renderList.getCall(0).args[0][0].date_),expectedDate )
        });

        it('should call renderError() with correct message', async function() {
            const errorMessage = "expected message";
            sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").throws(new Error(errorMessage));
            this.view.renderError = sinon.spy();

            await this.controller.loadAndRender();

            expect(this.view.renderError.calledOnce).to.be.true;
            expect(this.view.renderError.getCall(0).args[0] === errorMessage).to.be.true;
        });
    })
})
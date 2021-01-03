const assert = require('assert')
const chai = require('chai'), spies = require('chai-spies')
const expect = chai.expect;
const sinon = require("sinon");

chai.use(spies);

import Controller from '../../../view/scripts/controller'
import Data from '../../../view/scripts/data.remote'
import View from '../../../view/scripts/view'




describe('controller', function () {
    const fakeData = [
        {
            date_: new Date(),
            machine: 'Master250',
            customer: 'CCL USA',
            contact: 'M. Muster',
            issue: 'TestData',
            employee: 'Employee 1',
            time_: '5:30:00'
        }
    ]

    beforeEach(function(){
        this.view = sinon.createStubInstance(View)
        this.data = new Data("http://localhost:3000")
        this.ctrl = new Controller(this.view, this.data)
    })

    afterEach(() => {
        sinon.restore();
    });


    describe('loadAndRender()', function () {
        it('should call data once', function () {
            const stub = sinon.stub(this.data , "getWarrantyEntriesOfCurrentMonth").returns(fakeData)

            this.ctrl.loadAndRender();

            expect(stub.calledOnce).to.be.true;
        });

    })
})
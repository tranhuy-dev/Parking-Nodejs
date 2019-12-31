var assert = require('assert');
// const dataParking = [
//     {index: 0 , status: 1 , card: '123456'},
//     {index: 1 , status: 1 , card: '123456'},
//     {index: 2 , status: 1 , card: '123456'},
// ]

const parking = require('../parking');
describe('Parking car unit test', function () {
    describe('park car success with parking slot 0 empty', function () {
        it('should return index 0', function () {
            const dataParking = [
                { index: 0, status: 0, card: '' },
                { index: 1, status: 0, card: '' },
                { index: 2, status: 0, card: '' },
            ]
            assert.equal(parking.findMinIndex(dataParking), 0);
        });
    });

    describe('park car success with parking slot 2 empty', function () {
        it('should return index 2', function () {
            const dataParking = [
                { index: 0, status: 1, card: '123' },
                { index: 1, status: 1, card: '123' },
                { index: 2, status: 0, card: '' },
            ]
            assert.equal(parking.findMinIndex(dataParking), 2);
        });
    });

    describe('parking slot is over', function () {
        it('should return true', function () {
            const dataParking = [
                { index: 0, status: 1, card: '123' },
                { index: 1, status: 1, card: '1234' },
                { index: 2, status: 1, card: '123456' },
            ]
            assert.equal(parking.checkIsFullSlot(dataParking , 3), true);
        });
    });

    describe('Card ID not found', function () {
        it('should return -1', function () {
            const dataParking = [
                { index: 0, status: 1, card: '123' },
                { index: 1, status: 1, card: '1234' },
                { index: 2, status: 1, card: '123456' },
            ]
            assert.equal(parking.checkIDCard(dataParking , 1234), -1);
        });
    });
});
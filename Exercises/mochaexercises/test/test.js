var chai = require('chai');
var expect = require('chai').expect;
var calculator = require('./../lib/calculator');

describe('Calcutor', function () {
    it('Adds 2 numbers', function () {
        var n1 = 2;
        var n2 = 5;
        var output = calculator.add(n1, n2);

        expect(output).to.equal(7);
        expect(output).to.be.a('number');
        expect(output).to.not.be.a('string');
    });

    it('Reracts 1 number from another', function () {
        var n1 = 2;
        var n2 = 5;
        var output = calculator.retract(n1, n2);

        expect(output).to.equal(-3);
        expect(output).to.be.a('number');
        expect(output).to.not.be.a('string');
    });

    it('Multiplies 2 numbers', function () {
        var n1 = 2;
        var n2 = 5;
        var output = calculator.multiply(n1, n2);

        expect(output).to.equal(10);
        expect(output).to.be.a('number');
        expect(output).to.not.be.a('string');
    });

    it('Divides 2 numbers', function () {
        var n1 = 2;
        var n2 = 5;

        expect(calculator.divide.bind(n1, n2)).to.throw(Error);
    })
});

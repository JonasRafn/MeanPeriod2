var chai = require('chai');
var expect = require('chai').expect;
var module = require('../ex6');


describe('ModuleFile()', function () {
    it('Should print a list of files in a directory filtered on the extension', function () {
        module(process.argv[2], process.argv[3], function (err, data) {
            expect(data[0]).to.be.a('string');

        });
    });
});











var chai = require('chai');
var expect = require('chai').expect;
var word = require('../index');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

describe('Sanitize', function () {

    it('returns lower case of string', function () {
        var inputWord = 'HELLO WORLD';
        var outputWord = word.sanitize(inputWord);

        expect(outputWord).to.equal('hello world');
        expect(outputWord).to.not.equal('HELLO WORLD');
        expect(outputWord).to.be.a('string');
        expect(outputWord).to.not.be.a('number');
        expect(outputWord).to.contain('hello');
    });
    it('removes any hyphen', function () {
        var inputWord = 'HELLO-WORLD';
        var outputWord = word.sanitize(inputWord);

        expect(outputWord).to.equal('hello world');
    });
});

describe('Tokenize', function () {
    it('returns array of words', function () {
        var sentence = 'hello world';
        var tokenizedSentece = word.tokenize(sentence);

        expect(tokenizedSentece).to.include.members(['hello', 'world']);
    });
});

//Using sinon to stub the http request for a github repo
describe('Info Language', function () {
    it('returns language info of the repo', function (done) {
        var ghRepo = {
            'language': 'Assembly'
        };
        var stub = sinon.stub().callsArgWith(0, ghRepo);

        word.infoLang(stub, function (reply) {
            expect(reply).to.equal('Language is Assembly');
            console.log(reply);
            done();
        })
    })
});
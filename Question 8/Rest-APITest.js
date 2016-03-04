var request = require("request");
var expect = require("chai").expect;
var http = require("http");
var app = require('../app');
var server;
var TEST_PORT = 3456;

before(function (done) {
    var app = require('../app');
    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
        done();
    });
});

after(function (done) {
    server.close();
    done();
});

describe("GET: /api/joke/random", function () {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/joke/random",
        method: "GET",
        json: true
    };

    it("Should get a random joke", function (done) {
        request(options, function (error, res, body) {
            var body = body;
            expect(body.joke).to.be.a('string');
            done();
        });
    });
});

describe('GET: /api/jokes', function () {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET",
        json: true
    };

    it('Should get all jokes', function (done) {
        request(options, function (error, res, body) {
            var body = body;
            expect(body.jokes[1]).to.be.a('string');
            expect(body.jokes).to.have.length.above(3);
            done()
        });
    });
});

describe('POST: /api/joke', function () {
    var addOptions = {
        url: "http://localhost:" + TEST_PORT + "/api/joke",
        method: "POST",
        json: true
    };

    var getOptions = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "POST",
        json: true
    };

    it('Should add a joke', function (done) {
        addOptions.joke = 'A java programmer has a problem, now he a problemFactory';

        request(addOptions, function (error, res, body) {
            request(getOptions, function (error, res, body) {
                var body = body;
                expect(body.jokes[body.jokes.length - 1]).to.equal('A java programmer has a problem, now he a problemFactory');
                done();
            });
        });
    });
});

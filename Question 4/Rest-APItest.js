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

describe("POST: /gameapi/newgame ", function () {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/gameapi/newgame",
        method: "POST",
        json: true
    };

    it("should get a Game Object (Player-1)", function (done) {
        options.body = {playerName: "p1"};
        request(options, function (error, res, body) {
            var game = body;
            expect(game.player1).to.be.equal("p1");
            done();
        });
    });

    it('Should get a Game Object (Player-2)', function (done) {
        options.body = {playerName: "p2"};
        request(options, function (error, res, body) {
            var game = body;
            expect(game.player2).to.equal("p2");
            done();
        });
    });
});

describe('POST: /gameapi/init_computer_opponent', function () {
    var newgameOptions = {
        url: "http://localhost:" + TEST_PORT + "/gameapi/newgame",
        method: "POST",
        json: true
    };

    var initOptions = {
        url: "http://localhost:" + TEST_PORT + "/gameapi/init_computer_opponent",
        method: "POST",
        json: true
    };

    var game;

    it('Should set palyer 2 as server', function (done) {
        newgameOptions.body = {playerName: "p1"};
        request(newgameOptions, function (error, res, body) {
            game = body;

            initOptions.body = {id: game.gameId}
            request(initOptions, function (error, res, body) {
                game = body;
                expect(game.player2IsServer).to.be.true;
                expect(game.player2).to.equal('Server');
                done();
            });
        });


    });
});

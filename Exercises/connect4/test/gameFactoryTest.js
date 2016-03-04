var chai = require('chai');
var expect = require('chai').expect;
var gameFactory = require('./../gameUtils/gameFactory');


describe('newGame()', function () {
    it('Returns new game-object and initialize the gameContainer', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);

        expect(globalGameContainer.waitingGame.gameState).to.equal(0);
        expect(globalGameContainer.waitingGame.player1).to.equal('Arne');
    });

    it('Returns game-object and pairs second player with the first', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);
        gameFactory.newGame('Kurt', globalGameContainer);

        expect(globalGameContainer.waitingGame).to.equal(null);
        expect(globalGameContainer.game.gameState).to.equal(0);
        expect(globalGameContainer.game.player1).to.equal('Arne');
        expect(globalGameContainer.game.player2).to.equal('Kurt');
    });
});

describe('placeToken()', function () {
    it('Should be able to place token', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);
        gameFactory.newGame('Kurt', globalGameContainer);

        var game = globalGameContainer.game;

        gameFactory.placeToken(0, 5, "R", game);
        gameFactory.placeToken(2, 5, "B", game);

        expect(game.board[0][5]).to.equal('R');
        expect(game.board[2][5]).to.equal('B');
    });

    it('Should be able to verify moves, throws Error', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);
        gameFactory.newGame('Kurt', globalGameContainer);

        var game = globalGameContainer.game;

        gameFactory.placeToken(0, 5, "R", game);

        expect(gameFactory.placeToken.bind(0, 5, "R", game)).to.throw(Error);
    });

    it('Should be able to check for a winner (vertical)', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);
        gameFactory.newGame('Kurt', globalGameContainer);

        var game = globalGameContainer.game;

        var wonGame = [
            ['-', '-', 'R', 'R', 'R', 'R'],
            ['-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', 'B', 'B'],
            ['-', '-', '-', '-', '-', 'B'],
            ['-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-'],
            ['-', '-', '-', '-', '-', '-']
        ];

        gameFactory.placeToken(0, 5, "R", game);
        gameFactory.placeToken(2, 5, "B", game);
        gameFactory.placeToken(0, 4, "R", game);
        gameFactory.placeToken(3, 5, "B", game);
        gameFactory.placeToken(0, 3, "R", game);
        gameFactory.placeToken(2, 4, "B", game);
        gameFactory.placeToken(0, 2, "R", game);

        expect(game.board).to.be.eql(wonGame);
        expect(game.winner).to.equal('Arne');
    });

});

describe('initServerPlayer()', function () {
    it('Should set player 2 to server', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);

        gameFactory.initServerPlayer(globalGameContainer.waitingGame.gameId, globalGameContainer);

        expect(globalGameContainer.game.player2IsServer).to.be.true;
    });
});

describe('randomMove()', function () {
    it('Should make a random valid move', function () {
        var globalGameContainer = {
            waitingGame: null,
            game: null
        };

        gameFactory.newGame('Arne', globalGameContainer);
        gameFactory.newGame('Kurt', globalGameContainer);

        var game = globalGameContainer.game;

        var counter = 0;
        var running = true;

        while (running) {
            gameFactory.randomMove(game, game.turn);
            counter++;

            if (typeof game.winner === "string") {
                running = false;
            } else if (counter === 42) {
                running = false;
            }
        }

        expect(game.winner).to.be.a('string');

    });
});










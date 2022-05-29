// import {actionKing} from "@/modules/actionKing";
import {Chess} from 'chess.js'

import {actionQueen} from "@/modules/actionQueen";
import {actionBishop} from "@/modules/actionBishop";
import {actionRook} from "@/modules/actionRook";
import {actionKnight} from "@/modules/actionKnight";
import {actionPawn} from "@/modules/actionPawn";
import {actionKing} from "@/modules/actionKing";
import {Game} from "js-chess-engine/lib/js-chess-engine.mjs";

const jsChessEngine = require('js-chess-engine')

// Promotion
// var game = new jsChessEngine.Game('rnbqkbnr/ppp4P/3pp3/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 5')
// const chess = new Chess('rnbqkbnr/ppp4P/3pp3/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 5');
// /
// Normal
var game = new jsChessEngine.Game();
const chess = new Chess();

// Stalemate
// var game = new jsChessEngine.Game('8/8/8/8/8/3r4/3K1k2/8 w - - 0 1');
// const chess = new Chess('8/8/8/8/8/3r4/3K1k2/8 w - - 0 1');

// Computer stalemate
// var game = new jsChessEngine.Game('8/8/8/8/3R4/2K2k2/8/8 w - - 0 1');
// const chess = new Chess('8/8/8/8/3R4/2K2k2/8/8 w - - 0 1');

// Rocada
// var game = new jsChessEngine.Game('rn1qk2r/p1p2ppp/1p1p4/b2Ppb2/8/1PNP1Q2/P1PB2PP/R3KBNR b KQkq - 1 9\n');
// const chess = new Chess('rn1qk2r/p1p2ppp/1p1p4/b2Ppb2/8/1PNP1Q2/P1PB2PP/R3KBNR b KQkq - 1 9\n');

const moves = {
    piece: '',
    level: 4,
    resetAllActionOnTables() {
        let clicked = document.getElementsByClassName('clicked');

        for (let i = 0; i < clicked.length; i++) {
            clicked[i].classList.remove('clicked');
        }

        let squares = document.getElementsByClassName('square');
        let seePossibleMove, attackPossibleMove;

        for (let i = 0; i < squares.length; i++) {
            seePossibleMove = squares[i].querySelector('.see-possible-move');
            attackPossibleMove = squares[i].querySelector('.attack-possible-move');

            if (seePossibleMove) {
                seePossibleMove.remove();
            }

            if (attackPossibleMove) {
                attackPossibleMove.remove();
            }
        }

        let chessPieces = document.getElementsByClassName('chess-piece');

        for (let i = 0; i < chessPieces.length; i++) {
            chessPieces[i].classList.remove('checked');
        }
    },

    toggleCanMoveOn(position, initialPosition, piece, color) {
        let square = document.getElementById(position);

        let pieceOnSquare = square.querySelector('.chess-piece');

        if (pieceOnSquare) return;

        square.insertAdjacentHTML('afterbegin', `<div class="see-possible-move" data-piece="${piece}" data-initial-position="${initialPosition}" data-color="${color}"><div class="circle"></div></div>`)
    },

    toggleCanAttackOn(position, initialPosition, piece, color) {
        let square = document.getElementById(position);
        square.insertAdjacentHTML('afterbegin', `<div class="attack-possible-move" data-piece="${piece}" data-initial-position="${initialPosition}" data-color="${color}"><div class="circle"></div></div>`)
    },

    moveTo: function (position, tableDetails) {
        let square = document.getElementById(position);
        let seePossibleMove = square.querySelector('.see-possible-move');
        let canPossibleAttack = square.querySelector('.attack-possible-move');

        if (!seePossibleMove && !canPossibleAttack) return tableDetails;
        let initialPosition;
        let piece;
        let color;

        if (seePossibleMove) {
            initialPosition = seePossibleMove.getAttribute('data-initial-position');
            piece = seePossibleMove.getAttribute('data-piece');
            color = seePossibleMove.getAttribute('data-color');
        }

        if (canPossibleAttack) {
            initialPosition = canPossibleAttack.getAttribute('data-initial-position');
            piece = canPossibleAttack.getAttribute('data-piece');
            color = canPossibleAttack.getAttribute('data-color');
        }

        // try {
        //     game.move(initialPosition, position);
        // } catch (error) {
        //     document.getElementById(position).querySelector('.circle').classList.add('danger');
        //     return ;
        // }


        let actions = {};

        if (piece === 'pawn' && color === 'white' && position[1] === '8') {
            actions['action'] = 'newPiece';
            actions['options'] = {
                color,
                piece,
                position
            };
        }

        if (piece === 'pawn' && color === 'black' && position[1] === '1') {
            actions['action'] = 'newPiece';
            actions['options'] = {
                color,
                piece,
                position
            };
        }

        if ((piece === 'pawn' && color === 'white' && position[1] === '8') ||
            (piece === 'pawn' && color === 'black' && position[1] === '1')) {
            game.removePiece(initialPosition);
            window.removePieceChess = initialPosition.toLowerCase();
            // console.log("Remove:", chess.remove(initialPosition.toLowerCase()));
            // console.log(chess.put({type: 'q', color: color[0]}, position.toLowerCase()));

            // console.log(chess.move(position.toLowerCase() + "=Q"), position.toLowerCase() + "=Q")
        } else {
            try {
                game.move(initialPosition, position);
            } catch (error) {
                document.getElementById(position).querySelector('.circle').classList.add('danger');
                return ;
            }

            console.log("Move", chess.move({from: initialPosition.toLowerCase(), to: position.toLowerCase()}));

            console.log("Is check", chess.in_check());
            console.log("stalemate",  chess.in_stalemate() || chess.in_draw() || chess.insufficient_material() || chess.in_threefold_repetition());
            console.log("Is mate", chess.in_checkmate());
            console.log("History", chess.history());
            console.log("Fen", chess.fen());
            console.log("AiF", game.exportFEN());
        }


        tableDetails[initialPosition] = '';
        tableDetails[position] = `${color}-${piece}`;

        document.getElementById(position).innerHTML = document.getElementById(initialPosition).innerHTML;
        document.getElementById(initialPosition).innerHTML = '';

        this.resetAllActionOnTables();

        // this.checkIfCheck(position)

        if (chess.in_check()) {
            if (color === 'white') {
                document.querySelector('[data-color="black"][data-piece="king"]').classList.add('checked');
            } else {
                document.querySelector('[data-color="white"][data-piece="king"]').classList.add('checked');
            }
        }

        return {
            tableDetails,
            actions,
            inCheckmate: chess.in_checkmate(),
            inStalemate: chess.in_stalemate() || chess.in_draw() || chess.insufficient_material() || chess.in_threefold_repetition(),
            inCheck: chess.in_check()
        };
    },

    checkIfCheck: function (position) {
        var squareAttacked, chessPieceAttacked, colorAttacked, pieceAttacked;
        let square = document.getElementById(position);

        let chessPiece = square.querySelector('.chess-piece');


        let color = chessPiece.getAttribute('data-color');
        let piece = chessPiece.getAttribute('data-piece');
        let positionsToAttack;

        if (piece === 'queen') {
            positionsToAttack = actionQueen.positionToAttack(position, color);
        }

        if (piece === 'rook') {
            positionsToAttack = actionRook.positionToAttack(position, color);
        }

        if (piece === 'knight') {
            positionsToAttack = actionKnight.positionToAttack(position, color);
        }

        if (piece === 'bishop') {
            positionsToAttack = actionBishop.positionToAttack(position, color);
        }

        if (piece === 'pawn') {
            positionsToAttack = actionPawn.positionToAttack(position, color);
        }

        var checked = false;

        positionsToAttack.forEach((positionToAttack) => {
            squareAttacked = document.getElementById(positionToAttack);

            chessPieceAttacked = squareAttacked.querySelector('.chess-piece');


            colorAttacked = chessPieceAttacked.getAttribute('data-color');
            pieceAttacked = chessPieceAttacked.getAttribute('data-piece');

            if (pieceAttacked === 'king' && color !== colorAttacked) {
                chessPieceAttacked.classList.add('checked');
                checked = true;
                let kingCheckedPositionToMove = actionKing.getPositions(positionToAttack, colorAttacked);

                if (!kingCheckedPositionToMove.positionsToAttack.length && !kingCheckedPositionToMove.positionsToMove.length) {
                    console.log("CheckMate");
                }

                // if (!kingCheckedPositionToMove.positionsToAttack.length && kingCheckedPositionToMove.positionsToMove.length) {
                //     console.log(this.getAllPiecesAttackMoves(color));
                // }
            }
        })

        return checked
    },

    setAiLevel: function (level) {
        this.level = level;
    },

    aiMoves: function (tableDetails) {
        let aiMove = game.aiMove(this.level);

        let aiInitialPosition = Object.keys(aiMove)[0];
        let aiCurrentPosition = aiMove[aiInitialPosition];

        tableDetails[aiCurrentPosition] = tableDetails[aiInitialPosition];
        tableDetails[aiInitialPosition] = '';

        let square = document.getElementById(aiCurrentPosition);
        let chessPiece = square.querySelector('.chess-piece');

        let squareInitial = document.getElementById(aiInitialPosition);
        let chessPieceInitial = squareInitial.querySelector('.chess-piece');

        if (chessPiece && chessPieceInitial) {
            chessPiece.setAttribute('data-piece', chessPieceInitial.getAttribute('data-piece'));
            chessPiece.setAttribute('data-color', chessPieceInitial.getAttribute('data-color'));
            chessPiece.setAttribute('src', chessPieceInitial.getAttribute('src'));
            squareInitial.innerHTML = '';
        }



        chess.move({from: aiInitialPosition.toLowerCase(), to: aiCurrentPosition.toLowerCase()});

        console.log("Is check", chess.in_check());
        console.log("Is mate", chess.in_checkmate());
        console.log("History", chess.history());
        console.log("Fen", chess.fen());
        console.log("AiF", game.exportFEN());

        if (chess.in_check()) {
            if (chessPieceInitial.getAttribute('data-color') === 'white') {
                document.querySelector('[data-color="black"][data-piece="king"]').classList.add('checked');
            } else {
                document.querySelector('[data-color="white"][data-piece="king"]').classList.add('checked');
            }
        }

        return {tableDetails, inCheckmate: chess.in_checkmate(), inStaleMate: this.isStaleMate(), inCheck: chess.in_check()};
    },

    shouldMove: function (position) {
        let square = document.getElementById(position);
        let seePossibleMove = square.querySelector('.see-possible-move');
        let canAttackMove = square.querySelector('.attack-possible-move');

        if (seePossibleMove || canAttackMove) return true

        return false;
    },

    changePawnToPiece: function (tableDetails, options) {
        game.removePiece(options.position);

        let gamePiece = options.piece[0].toUpperCase();

        if (options.piece === 'knight') {
            gamePiece = 'N';
        }

        if (options.color === 'black') {
            gamePiece = gamePiece.toLowerCase();
        }

        console.log(options.color, gamePiece);

        game.setPiece(options.position, gamePiece);

        console.log(chess.remove(options.position.toLowerCase()));
        console.log(chess.put({
            type: gamePiece.toLowerCase(),
            color: options.color[0]
        }, options.position.toLowerCase()));

        this.setTurn(options.color[0] === 'w' ? 'b' : 'w');

        console.log("Is check", chess.in_check());
        console.log("Is mate", chess.in_checkmate());
        console.log("History", chess.history());
        console.log("Fen", chess.fen());
        console.log("Fen Ai", game.exportFEN());
        console.log("stalemate",  chess.in_stalemate() || chess.in_draw() || chess.insufficient_material() || chess.in_threefold_repetition());

        // console.log(chess.put({type: options.piece.toLowerCase()[0], color: options.color[0]}, options.position), {type: options.piece.toLowerCase(), color: options.color[0]}, options.position);
        console.log("Remove:", chess.remove(window.removePieceChess));

        tableDetails[options.position] = `${options.color}-${options.piece}`;
        return tableDetails;
    },

    setTurn: function (color) {
        var tokens = chess.fen().split(' ');
        tokens[1] = color;
        chess.load(tokens.join(' '));

        game = new Game(tokens.join(' '));
    },

    getAllPiecesAttackMoves(color) {
        let squares = document.getElementsByClassName('square');
        let positionsToAttack = [];
        let chessPiece, squareColor, piece, position;

        for (let i = 0; i < squares.length; i++) {
            chessPiece = squares[i].querySelector('.chess-piece');
            position = squares[i].getAttribute('id');

            if (chessPiece) {
                squareColor = chessPiece.getAttribute('data-color');
                piece = chessPiece.getAttribute('data-piece');

                if (squareColor === color) {

                    if (piece === 'queen') {
                        positionsToAttack = positionsToAttack.concat(actionQueen.positionToAttack(position, color));
                    }

                    if (piece === 'rook') {
                        positionsToAttack = positionsToAttack.concat(actionRook.positionToAttack(position, color));
                    }

                    if (piece === 'knight') {
                        positionsToAttack = positionsToAttack.concat(actionKnight.positionToAttack(position, color));
                    }

                    if (piece === 'bishop') {
                        positionsToAttack = positionsToAttack.concat(actionBishop.positionToAttack(position, color));
                    }

                    if (piece === 'pawn') {
                        positionsToAttack = positionsToAttack.concat(actionPawn.positionToAttack(position, color));
                    }

                    // console.log(piece, positionsToAttack, position, color);
                }
            }
        }

        return positionsToAttack;
    },

    getTurn()
    {
        return chess.turn() === 'b' ? 'black' : 'white';
    },

    isCheckMate() {
        return chess.in_checkmate();
    },

    isStaleMate() {
        return chess.in_stalemate() || chess.in_draw() || chess.insufficient_material() || chess.in_threefold_repetition();
    }
}

export {moves}

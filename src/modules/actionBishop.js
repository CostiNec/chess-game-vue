import {moves} from "@/modules/moves";

const actionBishop = {
    click: function (position, color) {
        let square = document.getElementById(position);

        let clicked = square.classList.contains('clicked');

        if (clicked) {
            moves.resetAllActionOnTables();
            return;
        }

        moves.resetAllActionOnTables();

        square.classList.add('clicked');

        let positions = this.getPositions(position, color);

        positions.positionsToMove.forEach((positionToMove) => {
            moves.toggleCanMoveOn(positionToMove, position, 'bishop', color);
        })

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'bishop', color);
        })
    },

    getPositions(position, color) {
        let positionsToMove = [];
        let positionsToAttack = [];

        let square, squareColor, squarePiece;

        // eslint-disable-next-line
        let positionLetter = position[0];

        // eslint-disable-next-line
        let positionNumber = parseInt(position[1]);

        let positionLD, positionRD, positionLU, positionRU;
        let positionNumberLD = positionNumber;
        let positionNumberRD = positionNumber;
        let positionNumberLU = positionNumber;
        let positionNumberRU = positionNumber;

        for (let positionLetterLDDecoded = positionLetter.charCodeAt(0) - 1; positionLetterLDDecoded >= 'A'.charCodeAt(0); positionLetterLDDecoded--) {
            if (positionNumberLD === 1) break;

            positionNumberLD--;
            positionLD = String.fromCharCode(positionLetterLDDecoded) + positionNumberLD;
            square = document.getElementById(positionLD);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionLD);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionLD);
                break;
            }
        }

        for (let positionLetterRDDecoded = positionLetter.charCodeAt(0) + 1; positionLetterRDDecoded <= 'H'.charCodeAt(0); positionLetterRDDecoded++) {
            if (positionNumberRD === 1) break;

            positionNumberRD--;
            positionRD = String.fromCharCode(positionLetterRDDecoded) + positionNumberRD;
            square = document.getElementById(positionRD);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionRD);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionRD);
                break;
            }
        }

        for (let positionLetterLUDecoded = positionLetter.charCodeAt(0) - 1; positionLetterLUDecoded >= 'A'.charCodeAt(0); positionLetterLUDecoded--) {
            if (positionNumberLU === 8) break;

            positionNumberLU++;
            positionLU = String.fromCharCode(positionLetterLUDecoded) + positionNumberLU;
            square = document.getElementById(positionLU);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionLU);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionLU);
                break;
            }
        }

        for (let positionLetterRUDecoded = positionLetter.charCodeAt(0) + 1; positionLetterRUDecoded <= 'H'.charCodeAt(0); positionLetterRUDecoded++) {
            if (positionNumberRU === 8) break;

            positionNumberRU++;
            positionRU = String.fromCharCode(positionLetterRUDecoded) + positionNumberRU;
            square = document.getElementById(positionRU);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionRU);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionRU);
                break;
            }
        }

        return {
            positionsToMove,
            positionsToAttack
        }
    },
    positionToAttack: function (position, color) {
        return this.getPositions(position, color).positionsToAttack;
    },

    positionToMove: function (position, color) {
        return this.getPositions(position, color).positionsToMove;
    },
}

export {actionBishop}

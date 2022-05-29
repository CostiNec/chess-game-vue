import {moves} from "@/modules/moves";

const actionRook = {
    click: function (position, color) {
        // eslint-disable-next-line
        let positionLetter = position[0];

        // eslint-disable-next-line
        let positionNumber = parseInt(position[1]);

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
            moves.toggleCanMoveOn(positionToMove, position, 'rook', color);
        })

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'rook', color);
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

        let positionL, positionR, positionD, positionU;
        let positionNumberL = positionNumber;
        let positionNumberR = positionNumber;

        for (let positionLetterLDecoded = positionLetter.charCodeAt(0) - 1; positionLetterLDecoded >= 'A'.charCodeAt(0); positionLetterLDecoded--) {
            positionL = String.fromCharCode(positionLetterLDecoded) + positionNumberL;
            square = document.getElementById(positionL);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionL);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionL);
                break;
            }
        }

        for (let positionLetterRDecoded = positionLetter.charCodeAt(0) + 1; positionLetterRDecoded <= 'H'.charCodeAt(0); positionLetterRDecoded++) {
            positionR = String.fromCharCode(positionLetterRDecoded) + positionNumberR;
            square = document.getElementById(positionR);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionR);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionR);
                break;
            }
        }

        for (let positionNumberD = positionNumber - 1; positionNumberD >= 1; positionNumberD--) {
            positionD = positionLetter + positionNumberD;
            square = document.getElementById(positionD);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionD);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionD);
                break;
            }
        }

        for (let positionNumberU = positionNumber + 1; positionNumberU <= 8; positionNumberU++) {
            positionU = positionLetter + positionNumberU;
            square = document.getElementById(positionU);
            squareColor = null;
            squarePiece = square.querySelector('.chess-piece');

            if (squarePiece) {
                squareColor = squarePiece.getAttribute('data-color');
            }


            if (squareColor === color) break;
            else if (squareColor === null) {
                positionsToMove.push(positionU);
            } else if (squareColor !== color) {
                positionsToAttack.push(positionU);
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

export {actionRook}

import {moves} from "@/modules/moves";

const actionKnight = {
    click: function (position, color) {

        let square = document.getElementById(position);

        let clicked = square.classList.contains('clicked');

        if (clicked) {
            moves.resetAllActionOnTables();
            return;
        }

        moves.resetAllActionOnTables();

        square.classList.add('clicked');

        let positions;

        positions = this.getPositions(position, color);

        positions.positionsToMove.forEach((positionToMove) => {
            moves.toggleCanMoveOn(positionToMove, position, 'knight', color);
        })

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'knight', color);
        })
    },

    getPositions(position, color) {
        let positionLetter = position[0];
        let positionNumber = parseInt(position[1]);
        let positionsToAttack = [];
        let positionsToMove = [];
        let allPositions = [];

        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) - 1) + (positionNumber + 2));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) + 1) + (positionNumber + 2));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) - 2) + (positionNumber + 1));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) + 2) + (positionNumber + 1));

        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) - 1) + (positionNumber - 2));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) + 1) + (positionNumber - 2));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) - 2) + (positionNumber - 1));
        allPositions.push(String.fromCharCode(positionLetter.charCodeAt(0) + 2) + (positionNumber - 1));

        let positionLetterPossible;
        let positionNumberPossible;
        let square, piece, myOwnPieceThere;

        allPositions.forEach((possiblePosition) => {
            myOwnPieceThere = false;
            positionLetterPossible = possiblePosition[0];
            positionNumberPossible = parseInt(possiblePosition[1]);

            square = document.getElementById(possiblePosition);

            if (square) {
                piece = square.querySelector('.chess-piece');

                if (piece) {
                    if (piece.getAttribute('data-color') === color) {
                        myOwnPieceThere = true;
                    }
                }
            }

            if (!myOwnPieceThere && possiblePosition.length < 3 && positionNumberPossible > 0 && positionNumberPossible < 9
                && positionLetterPossible.charCodeAt(0) >= 'A'.charCodeAt(0)
                && positionLetterPossible.charCodeAt(0) <= 'H'.charCodeAt(0)) {

                piece = square.querySelector('.chess-piece');

                if (piece) {
                    positionsToAttack.push(possiblePosition);
                } else {
                    positionsToMove.push(possiblePosition);
                }
            }
        });

        return {
            positionsToAttack,
            positionsToMove
        }
    },

    positionToAttack: function (position, color) {
        return this.getPositions(position, color).positionsToAttack;
    },


    positionToMove: function (position, color) {
        return this.getPositions(position, color).positionsToMove;
    },
}

export {actionKnight}

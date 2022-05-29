import {moves} from "@/modules/moves";
import {actionRook} from "@/modules/actionRook";
import {actionBishop} from "@/modules/actionBishop";

const actionQueen = {
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

        let positions = actionRook.getPositions(position, color);

        positions.positionsToMove.forEach((positionToMove) => {
            moves.toggleCanMoveOn(positionToMove, position, 'queen', color);
        });

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'queen', color);
        });

        positions = actionBishop.getPositions(position, color);

        positions.positionsToMove.forEach((positionToMove) => {
            moves.toggleCanMoveOn(positionToMove, position, 'queen', color);
        });

        positions.positionsToAttack.forEach((positionToAttack) => {
            moves.toggleCanAttackOn(positionToAttack, position, 'queen', color);
        });
    },

    positionToAttack: function (position, color) {
        return actionBishop.getPositions(position, color).positionsToAttack;
    },

    positionToMove: function (position, color) {
        return actionBishop.getPositions(position, color).positionsToMove;
    },
}

export {actionQueen}

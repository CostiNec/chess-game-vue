<template>
  <div class="center" :class="{'disabled': loadingAi}">
    <div v-for="(column,letter) in table" :key="letter" class="d-flex">
      <span class="numbers">{{ height - letter.charCodeAt(0) + 65 }}</span>
      <div v-for="(square, number) in column" :key="letter + number" class="d-flex">
        <div
            :id="String.fromCharCode(64 + parseInt(number)) + (2 * 'A'.charCodeAt(0) + height - letter.charCodeAt(0) - 65)"
            :class="{'brown': parity(letter, number), 'yellow': !parity(letter, number)}" class="square"
            @click="piece(String.fromCharCode(64 + parseInt(number)), (2 * 'A'.charCodeAt(0) + height - letter.charCodeAt(0) - 65))"
        >

          <chess-piece
              v-if="table[String.fromCharCode(64 + parseInt(number))][(2 * 'A'.charCodeAt(0) + height - letter.charCodeAt(0) - 65)]"
              :piece="table[String.fromCharCode(64 + parseInt(number))][(2 * 'A'.charCodeAt(0) + height - letter.charCodeAt(0) - 65)]"
          ></chess-piece>
        </div>
      </div>
    </div>

    <div class="d-flex letters-margins justify-content-space-between">
      <div v-for="(column,letter) in table" :key="letter" class="letters">
        {{ letter }}
      </div>
    </div>

    <Modal @choosePiece="choosePiece" v-if="showModal" :options="options"></Modal>
    <div class="modal-backdrop" v-if="checkMate">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Checkmate!
          </slot>

        </header>

        <section class="modal-body">
          <slot name="body">
            <div @click="restart">
              <button-list :text="'New game'"></button-list>
            </div>
          </slot>
        </section>
      </div>
    </div>

    <div class="modal-backdrop" v-if="staleMate">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Stalemate!
          </slot>

        </header>

        <section class="modal-body">
          <slot name="body">
            <div @click="restart">
              <button-list :text="'New game'"></button-list>
            </div>
          </slot>
        </section>
      </div>
    </div>

    <Loader v-if="loadingAi"></Loader>
  </div>
</template>

<script>
import ChessPiece from "@/components/ChessPiece";
import ButtonList from "@/components/ButtonList";
/* eslint-disable */
// eslint-disable-next-line
import {actionPawn} from "@/modules/actionPawn";
import {actionKing} from "@/modules/actionKing";
import {actionKnight} from "@/modules/actionKnight";
import {actionRook} from "@/modules/actionRook";
import {actionQueen} from "@/modules/actionQueen";

import {moves} from "@/modules/moves";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import {actionBishop} from "@/modules/actionBishop";
import MateModal from "@/components/MateModal";
import Vue from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Table",
  components: {
    // eslint-disable-next-line
    MateModal,
    Modal,
    Loader,
    // eslint-disable-next-line
    ChessPiece,
    ButtonList
  },
  props: {
    level: {
      type: Number,
      default() {
        return 2;
      }
    },
    tableDetails: {
      type: Object,
      default() {
        return {}
      }
    },
    useAi: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      checkMate: false,
      staleMate: false,
      showModal: false,
      options: {},
      loadingAi: false,
      table: {},
      height: 8,
      weight: 8,
      tableDetailsCustom: {}
    }
  },

  methods: {
    async piece(letter, number) {
      let moveDetails = {};

      if (!this.table[letter][number]) {
        if (!moves.shouldMove(letter + number)) return;

        moveDetails = moves.moveTo(letter + number, this.tableDetailsCustom);

        if (moveDetails.inCheckmate) this.checkMate = true;
        if (moveDetails.inStalemate) this.staleMate = true;

        console.log("Oficial", moveDetails.inStalemate)

        this.tableDetailsCustom = moveDetails['tableDetails'];

        if (moveDetails.actions.action === 'newPiece') {
          this.showModal = true;
          this.options = moveDetails.actions.options;
        }

        this.generateTable(this.tableDetailsCustom);

        if (this.useAi) {
          await this.moveAi();
          if (moves.isCheckMate()) {
            this.checkMate = true;
          }
        }

        return;
      } else {
        // let [color, piece] = this.table[letter][number].split('-');
        //
        // if (color !== moves.getTurn()) {
        //   moves.resetAllActionOnTables();
        //   return;
        // }
      }

      if (moves.shouldMove(letter + number)) {
        moveDetails = moves.moveTo(letter + number, this.tableDetailsCustom);
        if (moveDetails.inCheckmate) this.checkMate = true;
        if (moveDetails.inStalemate) this.staleMate = true;

        console.log("Oficial", moveDetails.inStalemate)

        this.tableDetailsCustom = moveDetails['tableDetails'];

        this.generateTable(this.tableDetailsCustom);

        if (this.useAi) {
          await this.moveAi();
          if (moves.isCheckMate()) {
            if (moveDetails.inCheckmate) this.checkMate = true;
          }
        } else {
          if (moveDetails.actions.action === 'newPiece') {
            this.showModal = true;
            this.options = moveDetails.actions.options;
          }
        }

        return;
      }


      let pieceOnTable = this.table[letter][number];
      let color, piece;
      [color, piece] = pieceOnTable.split('-');

      if (piece === 'pawn') {
        actionPawn.click(letter + number, color);
      }

      if (piece === 'knight') {
        actionKnight.click(letter + number, color);
      }

      if (piece === 'bishop') {
        actionBishop.click(letter + number, color);
      }

      if (piece === 'rook') {
        actionRook.click(letter + number, color);
      }

      if (piece === 'queen') {
        actionQueen.click(letter + number, color);
      }

      if (piece === 'king') {
        actionKing.click(letter + number, color);
      }

    },
    parity(letter, number) {
      return !((number % 2 === 1 && (letter.charCodeAt(0) - 1) % 2 === 1)
          || (number % 2 === 0 && (letter.charCodeAt(0) - 1) % 2 === 0));
    },

    async moveAi() {
      let tableDetailsCustomOptions;

      const sleep = ms => new Promise(r => setTimeout(r, ms));
      this.loadingAi = true;

      await sleep(1000);

      tableDetailsCustomOptions = moves.aiMoves(this.tableDetailsCustom);
      this.generateTable(tableDetailsCustomOptions.tableDetails);

      if (tableDetailsCustomOptions.inCheckmate) this.checkMate = true;
      if (tableDetailsCustomOptions.inStaleMate) this.staleMate = true;

      this.loadingAi = false;
    },

    generateTable(tableDetails) {
      let weight = this.weight;
      let height = this.height;
      let table = {};

      let letterPos;
      for (let letterAsciCode = 0; letterAsciCode < weight; letterAsciCode++) {
        letterPos = String.fromCharCode(65 + letterAsciCode);
        table[letterPos] = {};
        for (let numberPos = 1; numberPos <= height; numberPos++) {
          table[letterPos][numberPos] = '';

          if (typeof tableDetails[letterPos + numberPos] !== "undefined") {
            table[letterPos][numberPos] = tableDetails[letterPos + numberPos];
          }
        }
      }

      for (const letter in table) {
        this.$set(this.table, letter, table[letter]);

        for (const number in table[letter]) {
          this.$set(this.table[letter], number, this.table[letter][number]);
        }

      }

      this.table = table;
    },

    choosePiece(options) {
      this.tableDetailsCustom = moves.changePawnToPiece(this.tableDetailsCustom, options);

      let square = document.getElementById(options.position);
      let chessPiece = square.querySelector('.chess-piece');

      chessPiece.setAttribute('data-piece', options.piece);
      chessPiece.setAttribute('data-color', options.color);
      chessPiece.setAttribute('src', `/assets/${options.color}-${options.piece}.png`);

      this.generateTable(this.tableDetailsCustom);

      this.showModal = false;
    },

    restart() {
      window.location.href = '/'
    },
  },

  created() {
    moves.setAiLevel(this.level);
    this.tableDetailsCustom = this.tableDetails;
    this.generateTable(this.tableDetails);
  }

}
</script>

<style>
.d-flex {
  display: flex;
}

.justify-content-space-between {
  justify-content: space-between;
}

.square {
  width: 90px;
  height: 90px;
  position: relative;
}

.brown {
  background: #eeeed2;
}

.yellow {
  background: #769656;
}

/*.brown {*/
/*  background: #E1B494;*/
/*}*/

/*.yellow {*/
/*  background: #BD6716;*/
/*}*/

.center {
  margin: auto;
  width: fit-content;
}

.numbers {
  margin-top: 40px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 18px;
}

.letters {
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
  /*margin-left: 40px;*/
}

.letters-margins {
  margin: 0 50px;
}

.see-possible-move {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.see-possible-move .circle {
  background: radial-gradient(circle, rgb(117, 181, 192) 0%, rgb(92, 169, 169) 21%, rgb(29, 113, 166) 45%, rgb(156, 175, 194) 74%, rgba(240, 240, 240, 1) 100%);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  transition: .4s ease-in;
}

.see-possible-move .circle.danger {
  background: radial-gradient(circle, rgb(217 75 75) 0%, rgb(211 56 56) 21%, rgb(166 82 29) 45%, rgb(156, 175, 194) 74%, rgba(240, 240, 240, 1) 100%);
}

.attack-possible-move {
  width: 66px;
  height: 66px;
  padding: 1px;
  border: 11px solid rgba(255, 0, 0, .5);
  transition: 0.3s ease-in;
  position: absolute;
}

.disabled {
  pointer-events: none;
}

</style>

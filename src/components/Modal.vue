<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          Chose a piece!
        </slot>

      </header>

      <section class="modal-body">
        <slot name="body">
          <div class="d-flex">
            <div @click="choosePiece('knight')">
              <ChessPiece :piece="`${options.color}-knight`"></ChessPiece>
            </div>
            <div @click="choosePiece('bishop')">
              <ChessPiece :piece="`${options.color}-bishop`"></ChessPiece>
            </div>
            <div @click="choosePiece('queen')">
              <ChessPiece :piece="`${options.color}-queen`"></ChessPiece>
            </div>
            <div @click="choosePiece('rook')">
              <ChessPiece :piece="`${options.color}-rook`"></ChessPiece>
            </div>
          </div>
        </slot>
      </section>
    </div>
  </div>
</template>
<script>
import ChessPiece from "@/components/ChessPiece";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  components: {ChessPiece},
  props: {
    options: {}
  },
  methods: {
    choosePiece(piece) {
      let options = this.options;
      options.piece = piece;

      this.$emit('choosePiece', options)
    },
  },
  computed: {
  }
};
</script>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}

.modal-backdrop .chess-piece {
  position: relative;
}
</style>

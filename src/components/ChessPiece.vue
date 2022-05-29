<template>
  <div>
    <img class="chess-piece" :data-color="color" :data-piece="pieceName" :src="img">
  </div>
</template>

<script>
export default {
  name: "ChessPiece",
  props: {
    piece: {
      type: String,
      required: true
    }
  },
  computed: {
    img() {
      return require(`@/assets/${this.piece}.png`)
    },
    color() {
      return this.piece.split('-')[0];
    },

    pieceName() {
      return this.piece.split('-')[1];
    }
  }
}
</script>

<style scoped>
  .chess-piece {
    height: 70px;
    width: 70px;
    position: absolute;
    z-index: 2;
    margin-top: 8px;
    margin-left: 8px;
    cursor: pointer;
  }
</style>

<template>
  <div id="app">
    <div class="center" v-if="!show">
      <div @click="showRanges = !showRanges">
        <ButtonList :text="'Vs Computer'"></ButtonList>
      </div>
      <div v-if="showRanges">
        <div @click="choseMode('computer', 1)">
          <ButtonList :text="'Begginer'" :btn="'btn-three'"></ButtonList>
        </div>
        <div @click="choseMode('computer', 2)">
          <ButtonList :text="'Intermediate'" :btn="'btn-three'"></ButtonList>
        </div>
        <div @click="choseMode('computer', 3)">
          <ButtonList :text="'Advanced'" :btn="'btn-three'"></ButtonList>
        </div>
        <div @click="choseMode('computer', 4)">
          <ButtonList :text="'Expert'" :btn="'btn-three'"></ButtonList>
        </div>
      </div>
      <div class="mb-3"></div>
      <div @click="choseMode('human')">
        <ButtonList :text="'Vs Human'" class="mb-3"></ButtonList>
      </div>
    </div>
    <Table :table-details="tableDetails" :level="level" :use-ai="mode === 'computer'" v-if="show"></Table>
  </div>
</template>

<script>
import Table from "./components/Table";
import ButtonList from "@/components/ButtonList";

export default {
  name: 'App',
  /* eslint-disable */
  components: {ButtonList, Table},
  data() {
    let normal, promotion, stalemate, computerStaleMate;

    normal = {
      'A1': "white-rook",
      'B1': "white-knight",
      'C1': "white-bishop",
      'D1': "white-queen",
      'E1': "white-king",
      'F1': "white-bishop",
      'G1': "white-knight",
      'A2': "white-pawn",
      'B2': "white-pawn",
      'C2': "white-pawn",
      'D2': "white-pawn",
      'E2': "white-pawn",
      'F2': "white-pawn",
      'G2': "white-pawn",
      'H2': "white-pawn",
      'H1': "white-rook",
      'A8': "black-rook",
      'B8': "black-knight",
      'C8': "black-bishop",
      'D8': "black-queen",
      'E8': "black-king",
      'F8': "black-bishop",
      'G8': "black-knight",
      'H8': "black-rook",
      'A7': "black-pawn",
      'B7': "black-pawn",
      'C7': "black-pawn",
      'D7': "black-pawn",
      'E7': "black-pawn",
      'F7': "black-pawn",
      'G7': "black-pawn",
      'H7': "black-pawn",
    }

    promotion = {
      'A1': "white-rook",
      'B1': "white-knight",
      'C1': "white-bishop",
      'D1': "white-queen",
      'H7': "white-pawn",
      'E1': "white-king",
      'F1': "white-bishop",
      'G1': "white-knight",
      'A2': "white-pawn",
      'B2': "white-pawn",
      'C2': "white-pawn",
      'D2': "white-pawn",
      'F2': "white-pawn",
      'G2': "white-pawn",
      'H2': "white-pawn",
      'H1': "white-rook",
      'A8': "black-rook",
      'B8': "black-knight",
      'C8': "black-bishop",
      'D8': "black-queen",
      'E8': "black-king",
      'F8': "black-bishop",
      'G8': "black-knight",
      'H8': "black-rook",
      'A7': "black-pawn",
      'B7': "black-pawn",
      'C7': "black-pawn",
      'D6': "black-pawn",
      'E6': "black-pawn",
    }

    stalemate = {
      'D2': "white-king",
      'F2': "black-king",
      'D3': "black-rook"
    }

    computerStaleMate = {
      'C3': "white-king",
      'D4': "white-rook",
      "F3": "black-king"
    }

    return {
      showRanges: false,
      mode: '',
      level: 1,
      show: false,
      tableDetails: normal
    }
  },
  methods: {
    choseMode(mode, level = 1) {
      this.mode = mode;
      this.level = level;
      this.show = true;
    }
  }
}
</script>

<style>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mb-3 {
  margin-bottom: 1.5rem;
}
.checked {
  -webkit-box-shadow: 0px 0px 64px 0px rgba(255,0,0,1);
  -moz-box-shadow: 0px 0px 64px 0px rgba(255,0,0,1);
  box-shadow: 0px 0px 64px 0px rgba(255,0,0,1);
}

</style>

<template>
  <v-container
    class="pa-0">
    <v-layout column>
      <v-flex xs12 class="mt-5">
        <v-layout>
          <v-flex xs12 md5 class="text-xs-center">
            <h1>YOU</h1>
            <v-progress-linear 
              color="success" 
              height="40" 
              :value="this.playerHealth" 
              class="text-xs-center progress-bar">
              <span class="progress-bar">{{ playerHealth }}</span>
            </v-progress-linear>
          </v-flex>

          <v-flex xs12 md2></v-flex>
          
          <v-flex xs12 md5 class="text-xs-center">
            <h1>MONSTER</h1>
            <v-progress-linear 
              color="success" 
              height="40" 
              :value="this.monsterHealth" 
              class="text-xs-center">
              <span class="progress-bar">{{ monsterHealth }}</span>
            </v-progress-linear>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 class="my-5">
        <v-layout class="elevation-4 my-2 pa-2" justify-center row wrap>
          <template v-if="gameIsRunning">
            <v-btn color="success" @click="attack">ATTACK</v-btn>
            <v-btn color="warning" @click="specialAttack">SPECIAL ATTACK</v-btn>
            <v-btn color="info" @click="heal">HEAL</v-btn>
            <v-btn color="error" @click="giveUp">GIVE UP</v-btn>
            </template>
            
            <template v-else>
              <v-btn color="success" @click="startGame">START GAME</v-btn>
            </template>
        </v-layout>
      </v-flex>

      <v-flex xs12 class="my-5" v-if="turns.length > 0">
        <v-layout class="elevation-4 my-2 pa-2" justify-center row wrap>
         
          <v-flex 
            v-for="turn in turns" 
            :key="turn.id" 
            xs12 
            class="my-2 attacks"
            :class="{ monster: turn.isPlayer, player: !turn.isPlayer}">
              {{turn.text}}
          </v-flex>
         
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    }
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns= [];
    },
    attack() {
      let damage = this.calcDamage(2,10);
      //Reduce monster's health by...
      this.monsterHealth -= damage
      //Log the damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits monster for ' + damage
      })
      //if someone wins or lose then just "return" so you stop with the rest of code execution
      if (this.checkWin()) {
        return;
      }
      //Reduce player's health by...
      this.monsterAttacks();
    },
    specialAttack(){
      //Reduce monster's health by...
      let damage = this.calcDamage(12,24);
      this.monsterHealth -=  damage
      if (this.checkWin()) {
        return;
      }
      //Log the damage
      this.turns.unshift({
        isPlayer: true,
        text: 'Player specially attacks monster for ' + damage
      })
      //Reduce player's health by...
      this.monsterAttacks();
    },
    monsterAttacks(){
      let damage = this.calcDamage(2,10);
      this.playerHealth -= damage
      this.checkWin();
      //Log the damage
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits monster for ' + damage
      })
    },
    heal() {
      let heal = 20
      if (this.playerHealth <= 80) {
        this.playerHealth += heal;
      } else {
        this.playerHealth = 100;
      }
      //Log the healing
      this.turns.unshift({
        isPlayer: false,
        text: 'Player heals for ' + heal
      })
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    calcDamage(min, max) {
      return Math.max(Math.floor( Math.random() * max ) + 1, min)
    },
    checkWin() {
      //if monster wins
      if (this.monsterHealth <=0) {
        if (confirm ('You won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      //if player wins
      } else if (this.playerHealth <= 0) {
        if (confirm ('You lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped lang="scss">
  .attacks {
    padding:1rem;
    color: white;
    &.player {
      background: #61B865;

    }
    &.monster {
      background: #FF6666; 
    }
  }

  .progress-bar {
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
  }
</style>

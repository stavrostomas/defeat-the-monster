<template>
  <v-container 
    fill-height 
    class="pa-0"
    fluid>
    <v-layout
      justify-center
      align-center
      style="background:#00FFE3;"
      column>
      <h1>Kill The Monster</h1>
      <router-link tag="span" to="/game">
        <v-btn dark color="#FF2F5A">PLAY NOW</v-btn>
      </router-link>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: "home"
};
</script>

<style scoped lang="scss">
  h1 {
    color: #161A13;
  }
</style>

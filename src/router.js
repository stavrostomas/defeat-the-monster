import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: 'defeat-the-monster/',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/game",
      name: "game",
      component: Game
    }
  ]
});

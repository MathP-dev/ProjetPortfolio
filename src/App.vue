<template>
  <div id="app">
    <BurgerMenu />
    <Header />
    <router-view></router-view>
    <router-link to="/admin" v-if="isAdmin">Admin</router-link>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BurgerMenu from "./components/BurgerMenu.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    BurgerMenu,
  },
  data() {
    return {
      isAdmin: true,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
  font-family: "Candal", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: url("@/assets/sandra-ilic-_lgZwvaxGVg-unsplash.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
</style>

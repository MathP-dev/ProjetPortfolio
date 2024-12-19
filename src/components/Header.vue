<template>
  <header>
    <img @click="scrollToTop" src="../assets/newphoto.jpg" alt="Logo" />
    <nav>
      <li><router-link to="/#about">À propos</router-link></li>
      <li><router-link to="/#projects">Mes projets</router-link></li>
      <li><router-link to="/#contact">Contact</router-link></li>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Header",
  setup() {
    const currentSection = ref("about");

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const updateCurrentSection = () => {
      // Logique pour mettre à jour la section actuelle si nécessaire
    };

    onMounted(() => {
      window.addEventListener("scroll", updateCurrentSection);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", updateCurrentSection);
    });

    return { currentSection, scrollToTop };
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

nav a {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

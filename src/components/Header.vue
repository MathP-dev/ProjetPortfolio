<template>
  <header>
    <img @click="scrollToTop" src="../assets/newphoto.jpg" alt="Logo" />
    <nav>
      <li :class="{ active: currentSection === 'about' }">
        <router-link to="/#about">À propos</router-link>
      </li>
      <li :class="{ active: currentSection === 'projects' }">
        <router-link to="/#projects">Mes projets</router-link>
      </li>
      <li :class="{ active: currentSection === 'contact' }">
        <router-link to="/#contact">Contact</router-link>
      </li>
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
      const sections = ["about", "projects", "contact"];
      const scrollPosition = window.scrollY;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            currentSection.value = section;
            break;
          }
        }
      }
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

nav {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

nav li {
  list-style-type: none;
  margin: 0 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
  position: relative;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #007bff;
}

nav li.active a {
  color: #007bff;
  font-weight: bold;
}

nav li.active a::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #007bff;
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05);
}
</style>

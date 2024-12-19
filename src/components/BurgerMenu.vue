<template>
  <div>
    <div class="burger-menu" :class="{ active: isOpen }">
      <button @click="toggleMenu" class="burger-button">
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
        <span class="burger-bar"></span>
      </button>
      <nav class="menu-items" @click.stop>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/#about">À propos</router-link></li>
          <li><router-link to="/#projects">Mes projets</router-link></li>
          <li><router-link to="/#contact">Contact</router-link></li>
        </ul>
      </nav>
    </div>
    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

// Fermer le menu lorsque la route change
watch(
  () => router.currentRoute.value,
  () => {
    closeMenu();
  }
);

const handleOutsideClick = (event) => {
  if (isOpen.value && !event.target.closest(".burger-menu")) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<style scoped>
.burger-menu {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
}

.burger-button {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1002;
}

.burger-bar {
  width: 30px;
  height: 3px;
  background-color: white;
  transition: all 0.3s linear;
}

.active .burger-bar:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.active .burger-bar:nth-child(2) {
  opacity: 0;
}

.active .burger-bar:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.menu-items {
  position: fixed;
  top: 0;
  left: -100%;
  background-color: #642b2b;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.active .menu-items {
  left: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

li {
  margin-bottom: 15px;
}

a {
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  display: block;
  padding: 10px 15px;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #726c6c;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

nav {
  border-radius: 0 0 40% 5%;
}
</style>

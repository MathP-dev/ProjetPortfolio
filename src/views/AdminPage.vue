<template>
  <div v-if="isAuthenticated && isDataLoaded">
    <h2>Ajouter un nouveau projet</h2>
    <form @submit.prevent="addProject" class="add-project-form">
      <input
        v-model="newProject.title"
        placeholder="Titre du projet"
        required
      />
      <input v-model="newProject.image" placeholder="URL de l'image" required />
      <input v-model="newProject.additionalImages" placeholder="URL autres images" />
      <input v-model="newProject.date" placeholder="Date de création" />
      <input
        v-model="newProject.technologies"
        placeholder="Technologies (séparées par des virgules)"
        required
      />
      <input v-model="newProject.github" placeholder="Lien GitHub" />
      <input v-model="newProject.link" placeholder="Lien Projet" />
      <button type="submit">Ajouter le projet</button>
    </form>
  </div>
  <div v-else>
    <h2>Connexion</h2>
    <form @submit.prevent="login" class="login-form">
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isAuthenticated = ref(false);
const isDataLoaded = ref(false);
const password = ref("");
const newProject = reactive({
  title: "",
  image: "",
  additionalImages: "",
  date: "",
  technologies: "",
  github: "",
  link: ""
});

const login = () => {
  if (password.value === "test1234") {
    isAuthenticated.value = true;
    isDataLoaded.value = true;
    console.log("Connecté !");
  } else {
    alert("Mot de passe incorrect");
  }
};

const addProject = () => {
  store.dispatch("addProject", {
    id: Date.now(), // Génère un ID unique
    ...newProject,
    technologies: newProject.technologies.split(",").map((tech) => tech.trim()),
    additionalImages: newProject.additionalImages.split(",").map((img) => img.trim())
  });
  // Réinitialiser le formulaire
  Object.keys(newProject).forEach((key) => (newProject[key] = ""));
};
</script>

<style scoped>
.add-project-form,
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}
</style>

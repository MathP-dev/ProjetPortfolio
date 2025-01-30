<template>
  <div class="home">
    <section id="about">
      <h1>{{ name }}</h1>
      <h2 class="job">{{ job }}</h2>
      <p class="about-bio">{{ shortBio }}</p>
    </section>

    <section id="projects">
      <h2>Mes Projets</h2>
      <div class="carousel">
        <div class="carousel-inner" :style="{ width: `${totalWidth}px` }">
          <!-- Dupliquer les projets pour l'effet de continuité -->
          <div
            v-for="project in allProjects"
            :key="project.id"
            class="project-card"
            @click="openModal(project)"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="project-image"
            />
            <h3>{{ project.title }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- à changer avec EmailJS-com pour auto repply et reception des mails-->
    <section id="contact">
      <h2>Contact</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div>
          <label for="name">Nom/Prénom :</label>
          <input type="text" id="name" v-model="nameForm" required />
        </div>
        <div>
          <label for="subject">Objet :</label>
          <input type="text" id="subject" v-model="subject" required />
        </div>
        <div>
          <label for="message">Message :</label>
          <textarea id="message" v-model="message" required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>

    <img
      src="../assets/arrow.png"
      alt="Retour en haut"
      class="back-to-top"
      @click="scrollToTop"
    />

    <ProjectModal
      :project="selectedProject"
      v-if="showModal"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from 'vuex';
import ProjectModal from "./ProjectModal.vue";
import cvImage from "@/assets/cv-img.jpg";
import commentaireImage from "@/assets/dynamiser-img.jpg";
import cahierChargesImage from "@/assets/cahier-charges-img.jpg";
import cahierChargesTemplate from "@/assets/template CDC.pdf"
import emailjs from "emailjs-com";

const store = useStore();
const name = ref("Mathieu Paquier");
const job = ref("Développeur junior");
const shortBio = ref(
  "Cuisinier de métier je suis actuellement en reconversion et je suis à la recherche d'un stage afin de finaliser ma formation, et pouvoir intégrer une entreprise."
);

const projects = [
  {
    id: 1,
    title: "Mon CV",
    date: "2024",
    image: cvImage,
    technologies: ["HTML", "CSS"],
    additionalImages: [cvImage],
    link: [cvImage],
    github: "https://github.com/MathP-dev/Devoir-CV-HTML-CSS",
  },
  {
    id: 2,
    title: "Dynamiser un espace commentaire",
    date: "2024",
    image: commentaireImage,
    technologies: ["JavaScript", "HTML", "CSS"],
    additionalImages: [commentaireImage],
    link: [commentaireImage],
    github: "https://github.com/MathP-dev/DynamiserEspaceCommentaire",
  },
  {
    id: 3,
    title: "Cahier des charges",
    date: "2024",
    image: cahierChargesImage,
    technologies: ["Word, Figma"],
    additionalImages: [cahierChargesImage],
    link: [cahierChargesTemplate]
  },
];

const dynamicProjects = computed(() => store.getters.allProjects);
const allProjects = computed(() => [...projects, ...dynamicProjects.value, ...projects, ...dynamicProjects.value]); 
// Dupliquer les projets pour l'effet de continuité

const form = ref({ name: "", email: "", message: "" });
const selectedProject = ref(null);
const showModal = ref(false);

const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Calculer la largeur totale du carrousel
const totalWidth = computed(() => allProjects.length * 300);

const nameForm = ref("");
const subject = ref("");
const message = ref("");

const submitForm = async () => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: import.meta.env.VITE_CONTACT_EMAIL,
        from_name: nameForm.value,
        subject: subject.value,
        message: message.value,
      },
      import.meta.env.VITE_EMAILJS_USER_ID
    );
    alert("Message envoyé avec succès !");
    nameForm.value = "";
    subject.value = "";
    message.value = "";
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    alert("Une erreur est survenue lors de l'envoi du message.");
  }
};
</script>

<style scoped>
.carousel {
  overflow: hidden; /* Masquer le débordement */
}

.carousel-inner {
  display: flex; /* Pour permettre le défilement horizontal */
  animation: scroll linear infinite; /* Animation continue */
  animation-duration: 15s; /* Durée d'animation dynamique */
}

@keyframes scroll {
  0% {
    transform: translateX(0); /* Commence au début */
  }

  100% {
    transform: translateX(
      -50%
    ); /* Fin à gauche (50% pour deux ensembles de projets) */
  }
}

.project-card {
  flex-shrink: 0; /* Empêche le rétrécissement des cartes */
  width: 300px;
  margin-right: 200px; /*espacement entre les cartes */
}

.project-image {
  width: 100%;
  height: auto;
}

body,
h1,
h2,
h3,
p,
.job,
.about-bio {
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form {
  max-width: 400px;
  margin: 0 auto;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.5rem;
}

.contact-form button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: auto;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.back-to-top:hover {
  opacity: 0.8;
  border: 2px solid white;
  border-radius: 9px;
}
.about-bio {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.about-bio h1 {
  margin-bottom: 1rem;
}

.about-bio p {
  line-height: 1.6;
}

h2 {
  font-style: italic;
  text-decoration: underline;
}

.job {
  font-size: 20px;
  font-style: italic;
}
</style>

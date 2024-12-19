<template>
  <footer>
    <div class="social-icons">
      <a
        href="https://github.com/MathP-dev"
        target="_blank"
        aria-label="GitHub"
      >
        <img src="@/assets/github.png" alt="GitHub Logo" />
      </a>
      <a
        href="https://linkedin.com/in/MathieuPaquier"
        target="_blank"
        aria-label="LinkedIn"
      >
        <img src="@/assets/linkedin.png" alt="LinkedIn Logo" />
      </a>
    </div>
    <p>Dernière mise à jour : {{ lastUpdated }}</p>
  </footer>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Footer",
  setup() {
    const lastUpdated = ref(new Date().toLocaleDateString());

    return { lastUpdated };
  },
};
</script>

<style scoped>
footer {
  text-align: center;
  padding: 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-icons a img {
  width: 40px;
  height: auto;
  transition: transform 0.3s ease;
}

.social-icons a:hover img {
  transform: scale(1.5);
}

p {
  font-size: 20px;
}
</style>

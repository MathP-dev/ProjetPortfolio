<template>
  <div class="not-found">
    <img src="../assets/404-error-page-not-found.jpg" alt="404 Error" />
    <h1>404</h1>
    <p>Oops! La page que vous recherchez n'existe pas.</p>
    <router-link to="/">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 2rem;
}

.not-found img {
  max-width: 100%;
  height: auto;
}

img {
  border-radius: 1000px;
}
</style>

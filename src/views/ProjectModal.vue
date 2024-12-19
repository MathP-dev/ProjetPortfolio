<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <button @click="$emit('close')" class="close-button">&times;</button>
      <h2>{{ project.title }}</h2>
      <p>Date de création : {{ project.date }}</p>
      <p>Technologies : {{ project.technologies.join(", ") }}</p>

      <!-- Images supplémentaires -->
      <div class="additional-images">
        <h3>Images supplémentaires :</h3>
        <div class="image-gallery">
          <a
            v-for="(img, index) in project.additionalImages"
            :key="'img-' + index"
            :href="img"
            target="_blank"
          >
            <img
              :src="img"
              :alt="`${project.title} image ${index + 1}`"
              class="thumbnail"
            />
          </a>
        </div>
      </div>
      <a :href="project.link" target="_blank" class="project-link"
        >Visiter le projet</a
      ><br />
      <a
        v-if="project.github && project.title !== 'Cahier des charges'"
        :href="project.github"
        target="_blank"
        class="github-link"
        >Voir sur GitHub</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectModal",
  props: ["project"],
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: rgb(8 51 68);
  padding: 2rem;
  border-radius: 8px;
  position: absolute;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}
.main-image {
  width: 100%;
  max-height: 300px;
}

.additional-images {
  margin-top: 20px;
}

.image-gallery {
  display: flex;
}

.thumbnail {
  width: 80px;
  height: auto;
  margin-right: 10px;
}

.github-link,
.project-link {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #24292e;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.github-link:hover,
.project-link:hover {
  background-color: #2f363d;
}
</style>

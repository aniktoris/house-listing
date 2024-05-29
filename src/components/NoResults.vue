<template>
  <div class="no-results">
    <img src="../assets/icons/img_empty_houses@3x.png" alt="empty house" />
    <p class="no-results-p">No results found.</p>
    <p>Please try another keyword.</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.results {
  margin-left: 1rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--secondary-color);
  font-weight: 500;
}

.no-results img {
  height: 15rem;
  width: auto;
  padding-top: 2rem;
}

.no-results-p {
  margin-bottom: -0.5rem;
}

@media (max-width: 376px) {
  .no-results img {
    height: 7rem;
  }
}
</style>

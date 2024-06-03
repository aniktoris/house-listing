<template>
  <div class="img-container">
    <BackToOverview />
    <div class="listing-form-wrapper">
      <h2>Create new listing</h2>
      <ListingForm />
    </div>
  </div>
</template>

<script>
import ListingForm from '@/components/ListingForm.vue';
import BackToOverview from '@/components/BackToOverview.vue';

export default {
  components: { ListingForm, BackToOverview },
};
</script>

<style scoped>
.img-container {
  background: url('@/assets/icons/img_background@3x.png') no-repeat;
  background-size: cover;
  width: 100%;
}

h2 {
  font-size: var(--font-size-h1-desktop);
  font-family: var(--font-primary);
}

.listing-form-wrapper {
  margin-left: 8rem;
}

@media (max-width: 376px) {
  h2 {
    font-size: var(--font-size-h1-mobile);
    padding-top: 1.7rem;
  }
}
</style>

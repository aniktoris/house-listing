<template>
  <div class="img-container">
    <BackToOverview />
    <div class="listing-form-wrapper">
      <h2>Edit listing</h2>
      <ListingForm
        :populatedFormData="populatedFormData"
        :buttonName="buttonName"
      />
    </div>
  </div>
</template>

<script>
import ListingForm from '@/components/ListingForm.vue';
import BackToOverview from '@/components/BackToOverview.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHouseStore } from '@/stores/HouseStore';

export default {
  components: { ListingForm, BackToOverview },
  setup() {
    const populatedFormData = ref(null);
    const route = useRoute();
    const houseStore = useHouseStore();
    const buttonName = 'SAVE';

    onMounted(async () => {
      const houseId = route.params.houseId;
      populatedFormData.value = await houseStore.getHouseById(houseId);
    });

    return { populatedFormData, buttonName };
  },
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

<template>
  <img
    v-if="isMobile"
    @click="back"
    src="../assets/icons/ic_back_white@3x.png"
    alt="back arrow white"
    class="back-arrow-white"
  />
  <img
    v-else
    @click="back"
    src="../assets/icons/ic_back_grey@3x.png"
    alt="back arrow grey"
    class="back-arrow"
  />
  <h4>Back to overview</h4>
</template>

<script>
import { useRouter } from 'vue-router';
import { useHouseStore } from '../stores/HouseStore';

export default {
  setup() {
    const houseStore = useHouseStore();

    const isMobile = houseStore.isMobile;

    const router = useRouter();

    const back = () => {
      router.go(-1);
    };

    return { back, isMobile };
  },
};
</script>

<style scoped>
.back-arrow {
  width: auto;
  height: 1.3rem;
}

h4,
img {
  display: inline-block;
  color: var(--secondary-color);
  margin-left: 8rem;
  padding-top: 1rem;
}

img {
  width: 1.5rem;
  margin-right: -7rem;
  cursor: pointer;
}

@media (max-width: 376px) {
  h4 {
    display: none;
  }

  .back-arrow,
  .back-arrow-white {
    height: 1rem;
    width: auto;
  }

  .back-arrow-white {
    position: absolute;
    margin-left: 0;
    padding-left: 2rem;
    padding-top: 2rem;
    z-index: 1001;
  }
}
</style>

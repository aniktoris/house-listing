<template>
  <header v-if="!isMobile">
    <img
      alt="DTT logo"
      class="logo"
      src="@/assets/icons/img_logo_dtt@3x.png"
      width="auto"
      height="50"
    />
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Houses</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div class="main-wrapper">
    <main>
      <RouterView />
    </main>
  </div>
  <div v-if="isMobile" class="mobile-wrapper">
    <nav>
      <RouterLink to="/">
        <img
          src="./assets/icons/ic_mobile_navigarion_home_active@3x.png"
          alt="house icon"
          v-if="isActive('/')"
        />
        <img
          src="./assets/icons/ic_mobile_navigarion_home@3x.png"
          alt="house icon inactive"
          v-else
        />
      </RouterLink>
      <RouterLink to="/about">
        <img
          src="./assets/icons/ic_mobile_navigarion_info_active@3x.png"
          alt="info icon"
          v-if="isActive('/about')"
        />
        <img
          src="./assets/icons/ic_mobile_navigarion_info@3x.png"
          alt="info icon inactive"
          v-else
        />
      </RouterLink>
    </nav>
  </div>
</template>

<script>
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useHouseStore } from './stores/HouseStore';

export default {
  setup() {
    const houseStore = useHouseStore();

    const isMobile = houseStore.isMobile;

    const route = useRoute();
    const isActive = (path) => {
      return route.path === path;
    };

    return { isMobile, isActive };
  },
};
</script>

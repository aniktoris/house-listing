<template>
  <div v-if="house" class="house-item">
    <img :src="house.image" alt="house photo" class="house-image" />
    <div class="house-details">
      <div class="edit-container">
        <h2>{{ house.location.street }}</h2>
        <div class="icons-wrapper">
          <img
            v-if="isCurrentUserListing && isMobile"
            class="edit-icon"
            src="../assets/icons/ic_edit_white@3x.png"
            alt="edit icon white"
          />
          <img
            v-else-if="isCurrentUserListing"
            class="edit-icon"
            src="../assets/icons/ic_edit@3x.png"
            alt="edit icon"
          />
          <img
            v-if="isCurrentUserListing && isMobile"
            class="delete-icon"
            src="../assets/icons/ic_delete_white@3x.png"
            alt="delete icon white"
          />
          <img
            v-else-if="isCurrentUserListing"
            class="delete-icon"
            src="../assets/icons/ic_delete@3x.png"
            alt="delete icon"
          />
        </div>
      </div>

      <p class="price">
        <img
          class="price-icon"
          v-if="iconPricePath"
          :src="iconPricePath"
          alt="price icon"
        />
        <span v-else>€</span>
        {{ formatPrice(house.price) }}
      </p>

      <div class="location-container">
        <img
          class="location"
          v-if="iconLocationPath"
          :src="iconLocationPath"
          alt="location icon"
        />
        <p class="zip-city">
          {{ house.location.zip }} {{ house.location.city }}
        </p>
      </div>

      <div class="house-icons">
        <img src="../assets/icons/ic_bed@3x.png" />
        <p>{{ house.rooms.bedrooms }}</p>
        <img src="../assets/icons/ic_bath@3x.png" />
        <p>{{ house.rooms.bathrooms }}</p>
        <img src="../assets/icons/ic_size@3x.png" />
        <p>{{ house.size }} m2</p>
        <img v-if="iconGaragePath" :src="iconGaragePath" alt="garage icon" />
        <p v-if="iconGaragePath">{{ house.hasGarage ? 'Yes' : 'No' }}</p>
        <img v-if="iconBuildPath" :src="iconBuildPath" alt="build icon" />
        <p v-if="iconBuildPath">Built in {{ house.constructionYear }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useHouseStore } from '../stores/HouseStore';

export default {
  props: [
    'house',
    'iconLocationPath',
    'iconGaragePath',
    'iconPricePath',
    'iconBuildPath',
  ],
  setup(props) {
    const houseStore = useHouseStore();

    const isMobile = houseStore.isMobile;

    const houseId = computed(() => props.house.id);

    const isCurrentUserListing = computed(() =>
      houseStore.isCurrentUserListing(houseId.value),
    );

    const formatPrice = (price) => {
      return price.toLocaleString('nl-NL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };

    return { formatPrice, isCurrentUserListing, isMobile };
  },
};
</script>

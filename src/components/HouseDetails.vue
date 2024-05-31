<template>
  <div v-if="house" class="house-item">
    <img :src="house.image" alt="house photo" class="house-image" />
    <div class="house-details">
      <div class="edit-container">
        <h2>{{ house.location.street }} {{ house.location.houseNumber }}</h2>
        <div class="icons-wrapper">
          <img
            v-if="house.madeByMe && isWhiteEdit && isMobile"
            class="edit-icon"
            :src="isWhiteEdit"
            alt="edit icon white"
            @click="editListing"
          />
          <img
            v-else-if="house.madeByMe"
            class="edit-icon"
            src="../assets/icons/ic_edit@3x.png"
            alt="edit icon"
            @click="editListing"
          />
          <img
            v-if="house.madeByMe && isWhiteDelete && isMobile"
            class="delete-icon"
            :src="isWhiteDelete"
            alt="delete icon white"
          />
          <img
            v-else-if="house.madeByMe"
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
import { useRouter } from 'vue-router';
import { useHouseStore } from '../stores/HouseStore';

export default {
  props: [
    'house',
    'iconLocationPath',
    'iconGaragePath',
    'iconPricePath',
    'iconBuildPath',
    'isWhiteEdit',
    'isWhiteDelete',
  ],
  setup(props) {
    const router = useRouter();

    const houseStore = useHouseStore();

    const isMobile = houseStore.isMobile;

    const formatPrice = (price) => {
      return price.toLocaleString('nl-NL', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    };

    const editListing = () => {
      router.push({ name: 'editListing', props: { houseId: props.house.id } });
    };

    return { formatPrice, isMobile, editListing };
  },
};
</script>

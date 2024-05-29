<template>
  <BackToOverview />
  <div class="house-overview">
    <div class="loading" v-if="loading">Loading house description...</div>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="house-details-container" v-if="house">
      <HouseDetails
        :house="house"
        :iconLocationPath="iconLocationPath"
        :iconGaragePath="iconGaragePath"
        :iconPricePath="iconPricePath"
        :iconBuildPath="iconBuildPath"
      />

      <p class="description">{{ house.description }}</p>
    </div>
  </div>
</template>

<script>
import HouseDetails from '@/components/HouseDetails.vue';
import { useHouseStore } from '../stores/HouseStore';
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import BackToOverview from '@/components/BackToOverview.vue';

export default {
  components: { HouseDetails, BackToOverview },
  props: ['houseId'],
  setup(props) {
    const houseStore = useHouseStore();

    let house = ref(null);

    const { loading, error } = storeToRefs(houseStore);

    const iconLocationPath = '../src/assets/icons/ic_location@3x.png';
    const iconGaragePath = '../src/assets/icons/ic_garage@3x.png';
    const iconPricePath = '../src/assets/icons/ic_price@3x.png';
    const iconBuildPath = '../src/assets/icons/ic_construction_date@3x.png';

    onMounted(async () => {
      try {
        const houseData = await houseStore.getHouseById(props.houseId);
        house.value = houseData[0];
      } catch (error) {
        console.error(error.message);
      }
    });

    return {
      house,
      loading,
      error,
      iconLocationPath,
      iconGaragePath,
      iconPricePath,
      iconBuildPath,
    };
  },
};
</script>

<style scoped>
.house-overview {
  margin-top: 1rem;
  margin-left: 8rem;
}

.house-details-container {
  background: var(--background-2);
  width: 60%;
}

.house-overview :deep() .house-item {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.house-overview :deep() img {
  width: 100%;
}

.house-overview :deep() .house-icons img {
  width: 2%;
}

.house-overview :deep() .location {
  width: 9%;
}

.house-overview :deep() .price-icon {
  width: 3%;
  padding-right: 0.6rem;
}

.house-overview :deep() .location-container {
  display: inline-block;
}

.house-overview :deep() .location {
  display: inline-block;
  margin-right: 1rem;
  color: var(--secondary-color);
}

.house-overview :deep() .zip-city {
  display: inline-block;
  color: var(--secondary-color);
}

.description,
.house-overview :deep() .house-details {
  padding: 2rem;
  margin-top: -3rem;
}

.description {
  color: var(--secondary-color);
}

.house-overview :deep() .edit-icon {
  width: auto;
  height: 1.5rem;
  padding-right: 0.5rem;
  margin-left: -17rem;
}

.house-overview :deep() .delete-icon {
  width: auto;
  height: 1.5rem;
}

@media (max-width: 376px) {
  .house-overview {
    margin: 0;
  }

  .house-details-container {
    width: 100%;
  }

  .house-overview :deep() img {
    width: auto;
    height: 25%;
    border-radius: 0;
  }

  .house-overview :deep() .house-icons {
    display: flex;
    flex-wrap: wrap;
    margin-left: 0;
    margin-top: 0.2rem;
    max-width: 70%;
    max-height: calc(2 * (var(--font-size-listing-info-mobile) + 0.5rem));
    line-height: var(--font-size-listing-info-mobile);
    margin-bottom: 1rem;
  }

  .house-overview :deep() .house-icons img {
    width: 8%;
  }

  .house-overview :deep() .location {
    width: 6%;
  }

  .house-overview :deep() .price-icon {
    width: 5%;
  }

  .house-overview :deep() .price,
  .house-overview :deep() .location-container {
    display: flex;
    align-items: center;
    font-size: var(--font-size-listing-info-mobile);
    margin-top: -0.7rem;
  }

  .house-overview :deep() h2 {
    font-size: var(--font-size-h1-mobile);
    font-family: var(--font-primary);
    margin-left: 0.8rem;
    margin-top: -0.5rem;
  }

  .house-overview :deep() .zip-city {
    margin-left: -1rem;
  }

  .house-overview :deep() .edit-icon {
    height: 1rem;
    width: auto;
  }

  .house-overview :deep() .delete-icon {
    height: 1rem;
    width: auto;
  }

  .house-overview :deep() .icons-wrapper {
    margin-top: -33rem;
    z-index: 1001;
    position: absolute;
  }

  .house-overview :deep() .house-item {
    margin: -2rem;
    position: relative;
  }

  .house-overview :deep() .house-image {
    width: 24rem;
  }

  .house-overview :deep() .house-details {
    margin-left: 1rem;
    font-size: var(--font-size-listing-info-mobile);
    overflow: hidden;
    border-radius: 3rem 3rem 0 0;
    position: absolute;
    z-index: 1000;
    background: var(--background-2);
    top: calc(135% - 6rem);
    left: 0;
    right: 0;
    width: 87%;
  }

  .description {
    font-size: var(--font-size-listing-info-mobile);
    margin-top: calc(82% - 6rem);
    width: 85%;
    letter-spacing: 0.03rem;
  }
}
</style>

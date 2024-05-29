<template>
  <div class="houses-wrapper">
    <div class="house-button-wrapper">
      <h1>Houses</h1>
      <button class="btn-create-new" @click="createNewListing">
        + CREATE NEW
      </button>
    </div>
    <SearchInput
      @update-filter="handleFilterUpdate"
      :sortBy="sortBy"
      :sortType="sortType"
    />
    <div class="loading" v-if="loading">Loading houses...</div>
    <div class="error" v-if="error">{{ error }}</div>

    <div v-if="filter === 'all'">
      <div class="houses-list" v-for="house in sortedHouses" :key="house.id">
        <router-link
          :to="{ name: 'houseOverview', params: { houseId: house.id } }"
          class="router-link-style"
        >
          <HouseDetails :house="house" />
        </router-link>
      </div>
    </div>

    <div v-if="filter === 'filteredHouses'">
      <h2 class="results" v-if="searchQuery && totalSearchResults > 0">
        {{ totalSearchResults }} results found
      </h2>
      <div class="houses-list" v-for="house in sortedHouses" :key="house.id">
        <router-link
          :to="{ name: 'houseOverview', params: { houseId: house.id } }"
          class="router-link-style"
        >
          <HouseDetails :house="house" />
        </router-link>
      </div>
    </div>

    <NoResults v-if="totalSearchResults <= 0 && !loading" />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useHouseStore } from '../stores/HouseStore';
import HouseDetails from '../components/HouseDetails.vue';
import SearchInput from '../components/SearchInput.vue';
import NoResults from '../components/NoResults.vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { HouseDetails, SearchInput, NoResults },
  setup() {
    const houseStore = useHouseStore();

    const { houses, loading, error, filteredHouses, searchQuery } =
      storeToRefs(houseStore);

    houseStore.getHouses();

    const filter = ref('all');

    const handleFilterUpdate = (filterType) => {
      filter.value = filterType;
    };

    const totalSearchResults = computed(() => filteredHouses.value.length);

    const sortType = ref(null);

    const router = useRouter();

    const sortedHouses = computed(() => {
      let housesToSort =
        filter.value === 'all' ? houses.value : filteredHouses.value;
      if (sortType.value) {
        return housesToSort.sort((a, b) => {
          if (sortType.value === 'price') {
            return a.price - b.price;
          } else if (sortType.value === 'size') {
            return a.size - b.size;
          }
          return 0;
        });
      }
      return housesToSort;
    });

    const sortBy = (type) => {
      sortType.value = type;
    };

    const createNewListing = () => {
      router.push({ name: 'createListing' });
    };

    return {
      houses,
      loading,
      error,
      filteredHouses,
      filter,
      handleFilterUpdate,
      totalSearchResults,
      searchQuery,
      sortedHouses,
      sortBy,
      sortType,
      createNewListing,
    };
  },
};
</script>

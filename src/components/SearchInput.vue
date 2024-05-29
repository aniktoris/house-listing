<template>
  <div class="search-wrapper">
    <div class="search-container">
      <input
        class="input-field"
        type="text"
        v-model="searchQuery"
        placeholder="Search by city, street, or ZIP code"
      />
      <img
        class="search-icon"
        src="../assets/icons/ic_search@3x.png"
        alt="search icon"
        @click="applyFilter"
      />
      <img
        class="clear-icon"
        src="../assets/icons/ic_clear@3x.png"
        alt="clear icon"
        @click="clearSearch"
      />
    </div>
    <div class="filter-buttons">
      <button
        :class="{ active: sortType === 'price' }"
        @click="sortBy('price')"
      >
        Price
      </button>
      <button :class="{ active: sortType === 'size' }" @click="sortBy('size')">
        Size
      </button>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useHouseStore } from '../stores/HouseStore';

export default {
  props: {
    sortBy: Function,
    sortType: String,
  },
  emits: ['update-filter'],
  setup(_, context) {
    const houseStore = useHouseStore();

    const { searchQuery } = storeToRefs(houseStore);

    const applyFilter = () => {
      if (searchQuery.value !== '') {
        context.emit('update-filter', 'filteredHouses');
      }
    };

    const clearSearch = () => {
      searchQuery.value = '';
    };

    return { searchQuery, applyFilter, clearSearch };
  },
};
</script>

<style scoped>
.search-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.search-container {
  position: relative;
  width: 35rem;
}

.input-field {
  width: 100%;
  padding: 1rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background: var(--tertiary-light);
  margin: 2rem 1rem;
  box-sizing: border-box;
  padding-left: 4rem;
  color: var(--secondary-color);
  font-size: var(--font-size-input-title-desktop);
  font-family: var(--font-secondary);
}

.search-icon,
.clear-icon {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  height: auto;
  width: 1.5rem;
}

.search-icon {
  left: 2.5rem;
}

.clear-icon {
  right: 0;
}

.filter-buttons {
  display: flex;
  height: 2.8rem;
  border: 0.5rem;
  margin-right: 1rem;
  border-radius: 5rem;
}

.filter-buttons button {
  height: 100%;
  cursor: pointer;
  border: none;
  background: var(--tertiary-gray);
  color: var(--background-2);
  font-weight: bold;
  font-size: var(--font-size-button-desktop);
  font-family: var(--font-primary);
  width: 8rem;
}

.filter-buttons button:first-child {
  border-radius: 0.7rem 0 0 0.7rem;
}

.filter-buttons button:last-child {
  border-radius: 0 0.7rem 0.7rem 0;
}

.filter-buttons .active {
  background: var(--primary-color);
}

@media (max-width: 376px) {
  .search-container {
    width: 20.5rem;
  }

  .input-field {
    margin-top: 0.5rem;
    height: 2.6rem;
  }

  .search-icon {
    left: -1.5rem;
    top: 40%;
  }

  .clear-icon {
    right: -4rem;
    top: 40%;
  }

  .search-wrapper {
    justify-content: center;
    flex-direction: column;
  }

  .filter-buttons {
    margin-left: 1rem;
    margin-bottom: 1rem;
    margin-top: -0.5rem;
  }

  .filter-buttons button {
    width: 10rem;
    height: 2.3rem;
    font-size: var(--font-size-button-mobile);
  }

  .input-field {
    margin-left: 0.1rem;
  }

  .search-icon,
  .clear-icon {
    height: 20%;
    width: auto;
    margin-top: -0.2rem;
  }

  .search-icon {
    margin-left: -1rem;
  }

  .clear-icon {
    margin-right: 1rem;
  }
}
</style>

import { defineStore } from 'pinia';

export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    houses: [],
    loading: false,
    error: false,
    searchQuery: '',
    currentUserListing: [3, 5],
    isMobile: window.innerWidth <= 375 && window.innerHeight <= 667,
  }),
  getters: {
    filteredHouses() {
      return this.houses.filter(
        (house) =>
          house.location.city
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          house.location.zip
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          house.location.street
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()),
      );
    },
    isCurrentUserListing: (state) => (id) => {
      return state.currentUserListing.includes(id);
    },
  },
  actions: {
    async getHouses() {
      this.loading = true;
      try {
        const res = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: { 'X-Api-Key': 'm1YE7rNAeqP0uTZfc5bhBO-wSL3RD69d' },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        this.houses = data;
      } catch (error) {
        this.error = 'Failed to load houses. Please try again later';
      } finally {
        this.loading = false;
      }
    },
    async getHouseById(id) {
      this.loading = true;
      try {
        const res = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
          headers: { 'X-Api-Key': 'm1YE7rNAeqP0uTZfc5bhBO-wSL3RD69d' },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        this.error = 'Failed to load a house. Please try again later';
      } finally {
        this.loading = false;
      }
    },

    async uploadImage(id, image) {
      this.loading = true;

      try {
        const res = await fetch(
          `https://api.intern.d-tt.nl/api/houses/${id}/upload`,
          {
            headers: {
              'X-Api-Key': 'm1YE7rNAeqP0uTZfc5bhBO-wSL3RD69d',
            },
            method: 'POST',
            body: image,
          },
        );
        if (!res.ok) {
          throw new Error(
            `Error uploading image: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Failed to upload image:', error);
      } finally {
        this.loading = false;
      }
    },
    async createHouse(formData) {
      this.loading = true;

      try {
        const res = await fetch('https://api.intern.d-tt.nl/api/houses', {
          headers: {
            'X-Api-Key': 'm1YE7rNAeqP0uTZfc5bhBO-wSL3RD69d',
          },
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(
            `Error creating a house listing: ${res.status} ${res.statusText}`,
          );
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error('Failed to create a house listing:', error);
        this.error = `Failed to create a house listing. Please try again later. ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
});

import { defineStore } from 'pinia';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_WEBSITE = import.meta.env.VITE_API;

export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    houses: [],
    loading: false,
    error: false,
    searchQuery: '',
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
  },
  actions: {
    async getHouses() {
      this.loading = true;
      try {
        const res = await fetch(`${API_WEBSITE}/api/houses`, {
          headers: { 'X-Api-Key': API_KEY },
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
        const res = await fetch(`${API_WEBSITE}/api/houses/${id}`, {
          headers: { 'X-Api-Key': API_KEY },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
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
        const res = await fetch(`${API_WEBSITE}/api/houses/${id}/upload`, {
          headers: {
            'X-Api-Key': API_KEY,
          },
          method: 'POST',
          body: image,
        });
        if (!res.ok) {
          throw new Error(
            `Error uploading image: ${res.status} ${res.statusText}`,
          );
        }
      } catch (error) {
        console.error('Failed to upload image:', error);
        this.error = 'Failed to upload image. Try again later';
      } finally {
        this.loading = false;
      }
    },
    async createHouse(formData) {
      this.loading = true;

      try {
        const res = await fetch(`${API_WEBSITE}/api/houses`, {
          headers: {
            'X-Api-Key': API_KEY,
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
        this.error =
          'Failed to create a house listing. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async editHouse(formData, id) {
      this.loading = true;

      try {
        const res = await fetch(`${API_WEBSITE}/api/houses/${id}`, {
          headers: {
            'X-Api-Key': API_KEY,
          },
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(
            `Error editing a house listing: ${res.status} ${res.statusText}`,
          );
        }
      } catch (error) {
        console.error('Failed to edit a house listing:', error);
        this.error = 'Failed to edit a house listing. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    async deleteHouse(id) {
      this.loading = true;

      this.houses = this.houses.filter((house) => house.id !== id);

      try {
        const res = await fetch(`${API_WEBSITE}/api/houses/${id}`, {
          headers: {
            'X-Api-Key': API_KEY,
          },
          method: 'DELETE',
        });

        if (!res.ok) {
          throw new Error(
            `Error deleting a house listing: ${res.status} ${res.statusText}`,
          );
        }
      } catch (error) {
        console.error('Failed to delete a house listing:', error);
        this.error =
          'Failed to delete a house listing. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
  },
});

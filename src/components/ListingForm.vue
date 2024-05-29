<template>
  <form @submit.prevent="handleSubmit">
    <label for="street-name">Street name*</label>
    <input
      id="street-name"
      type="text"
      placeholder="Enter the street name"
      v-model="formData.streetName"
      required
    />

    <div class="house-wrapper">
      <div>
        <label for="house-number">House number*</label>
        <br />
        <input
          id="house-number"
          type="number"
          placeholder="Enter house number"
          v-model="formData.houseNumber"
          required
        />
      </div>
      <div>
        <label for="addition">Addition(optional)</label>
        <br />
        <input
          type="text"
          placeholder="e.g. A"
          v-model="formData.numberAddition"
        />
      </div>
    </div>

    <label for="postal-code">Postal code*</label>
    <input
      id="postal-code"
      type="text"
      placeholder="e.g. 1000 AA"
      v-model="formData.zip"
      required
    />

    <label for="city">City*</label>
    <input
      id="city"
      type="text"
      placeholder="e.g. Utrecht"
      v-model="formData.city"
      required
    />

    <label for="city">Upload picture (PNG or JPG)*</label>
    <input
      id="image-upload"
      ref="imageUpload"
      type="file"
      accept="image/png, image/jpeg"
      style="display: none"
      @change="handleImagePreview"
    />
    <img
      src="../assets/icons/ic_upload@3x.png"
      alt="upload plus"
      @click="triggerFileInput"
      id="upload-icon"
    />
    <img
      :src="imagePreview"
      alt="image preview"
      v-if="imagePreview"
      class="image-preview"
    />
    <img
      src="../assets/icons/ic_clear_white@3x.png"
      alt="clear icon white"
      v-if="imagePreview"
      class="clear-icon-white"
      @click="clearImagePreview"
    />

    <label for="price">Price*</label>
    <input
      id="price"
      type="number"
      placeholder="e.g. €150.000"
      v-model="formData.price"
      required
    />

    <div class="house-wrapper">
      <div>
        <label for="size">Size*</label>
        <br />
        <input
          id="size"
          type="number"
          placeholder="e.g. 60m2"
          v-model="formData.size"
          required
        />
      </div>
      <div>
        <label for="garage">Garage*</label>
        <br />
        <select v-model="formData.hasGarage" required>
          <option value="" disabled selected>Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>

    <div class="house-wrapper">
      <div>
        <label for="bedrooms">Bedrooms*</label>
        <br />
        <input
          id="bedrooms"
          type="number"
          placeholder="Enter amount"
          v-model="formData.bedrooms"
          required
        />
      </div>
      <div>
        <label for="bathrooms">Bathrooms*</label>
        <br />
        <input
          type="number"
          placeholder="Enter amount"
          v-model="formData.bathrooms"
          required
        />
      </div>
    </div>

    <label for="construction-date">Construction date*</label>
    <input
      id="construction-date"
      type="text"
      placeholder="e.g. 1990"
      v-model="formData.constructionYear"
      required
    />

    <label for="description">Description*</label>
    <input
      id="description"
      type="text"
      placeholder="Enter description"
      v-model="formData.description"
      required
    />

    <button class="btn-post" type="submit">POST</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useHouseStore } from '@/stores/HouseStore';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const imagePreview = ref('');

    const formData = ref({
      price: 500000,
      bedrooms: 3,
      bathrooms: 2,
      size: 120,
      streetName: 'Stokvisstrat',
      houseNumber: 132,
      numberAddition: 'A',
      zip: '1000AA',
      city: 'Amsterdam',
      constructionYear: '1901',
      hasGarage: true,
      description: 'Lorem ipsum',
    });

    const router = useRouter();

    const triggerFileInput = () => {
      document.getElementById('image-upload').click();
    };

    const houseStore = useHouseStore();

    const handleImagePreview = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
      };
      reader.readAsDataURL(file);
    };

    const clearImagePreview = () => {
      imagePreview.value = '';
    };

    const handleSubmit = async () => {
      const imageFile = imagePreview.value;
      if (!imageFile) {
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Please select an image.';
        document.getElementById('upload-icon').appendChild(errorDiv);
        return;
      }

      try {
        const formValuesFromRef = formData.value;

        const formDataToSubmit = new FormData(); // The object that we need to send using Fetch

        for (const key in formValuesFromRef) {
          // loop over all the formData values defined above e.g. price, description etc.
          // append them inside the FormData object that we created
          formDataToSubmit.append(key, formValuesFromRef[key]);
        }

        const house = await houseStore.createHouse(formDataToSubmit);
        console.log('House API response:', house);
        if (!house.id) {
          throw new Error('House ID is missing from the API response');
        }
        await houseStore.uploadImage(house.id, imageFile);
        console.log('House created successfully:');
        houseStore.houses.push(house);
        router.push({ name: 'houseOverview', params: { id: house.id } });
      } catch (error) {
        console.error('Error creating house:', error);
      }
    };

    return {
      triggerFileInput,
      imagePreview,
      handleImagePreview,
      clearImagePreview,
      handleSubmit,
      formData,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  font-family: var(--font-primary);
  font-size: var(--font-size-input-title-desktop);
  font-weight: 600;
  color: var(--secondary-color);
}

input,
select {
  border: none;
  width: 31.8%;
  border-radius: 0.5rem;
  padding: 1rem;
}

input::placeholder {
  font-family: var(--font-primary);
}

label {
  padding: 0.8rem;
}

.house-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.house-wrapper input,
select {
  width: 65%;
  margin-top: 1rem;
  padding-right: 3.7rem;
}

#price {
  margin-bottom: 1rem;
}

select {
  width: 14.3rem;
  font-family: var(--font-primary);
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

#street-name {
  margin-bottom: 1rem;
}

img {
  height: 2rem;
  width: 2rem;
  padding: 3rem;
  border: 2px dashed lightgray;
  cursor: pointer;
}

.btn-post {
  color: var(--background-2);
  border: none;
  font-weight: bold;
  font-family: var(--font-primary);
  padding: 0.8rem;
  width: 13rem;
  font-size: var(--font-size-button-desktop);
  border-radius: 0.7rem;
  margin-right: 1rem;
  cursor: pointer;
  margin-bottom: 3rem;
  background: var(--primary-color);
  position: relative;
  margin-left: 16.2rem;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(195, 195, 195, 0.3);
  pointer-events: none;
  border-radius: inherit;
}

#description {
  margin-bottom: 2rem;
  padding-bottom: 7rem;
}

.image-preview {
  height: 8.7rem;
  width: 8.7rem;
  padding: 0;
  border: none;
  border-radius: 0.5rem;
  position: absolute;
  bottom: -8.5%;
}

.clear-icon-white {
  padding: 0;
  border: none;
  position: absolute;
  bottom: 7%;
  left: 17%;
}
</style>

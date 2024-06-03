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
    <div class="img-container">
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
    </div>
    <div v-if="imageError" class="error-message">{{ imageError }}</div>

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

    <div class="loading" v-if="houseStore.loading">Loading...</div>
    <div class="error" v-if="houseStore.error">{{ houseStore.error }}</div>

    <button class="btn-post" type="submit">
      {{ buttonName ? buttonName : 'POST' }}
    </button>
  </form>
</template>

<script>
import { ref, watch } from 'vue';
import { useHouseStore } from '@/stores/HouseStore';
import { useRouter } from 'vue-router';
export default {
  props: {
    populatedFormData: {
      type: Object,
      default: () => ({}),
    },
    buttonName: {
      type: String,
    },
  },
  setup(props) {
    const imagePreview = ref('');
    const imageUpload = ref('');
    const imageError = ref('');

    const formData = ref({
      price: '',
      bedrooms: '',
      bathrooms: '',
      size: '',
      streetName: '',
      houseNumber: '',
      numberAddition: '',
      zip: '',
      city: '',
      constructionYear: '',
      hasGarage: '',
      description: '',
    });

    watch(
      // watch the populatedFormData prop for changes
      () => props.populatedFormData,
      // callback function to handle the changes
      (newData) => {
        if (newData && newData.length > 0) {
          const firstItem = newData[0];
          const { location, rooms, ...rest } = firstItem;
          const {
            street: streetName,
            houseNumberAddition: numberAddition,
            ...restLocation
          } = location; // renaming street to streetName and houseNumberAddition to numberAddition
          const populatedData = {
            ...rest,
            streetName,
            numberAddition,
            ...restLocation,
            ...rooms,
          };
          formData.value = { ...populatedData };
          imagePreview.value = firstItem.image;
        }
      },
      { immediate: true },
    );

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
      imageError.value = '';
    };

    const clearImagePreview = () => {
      imagePreview.value = '';
      imageUpload.value = '';
    };

    const handleSubmit = async () => {
      try {
        houseStore.loading = true;
        const formValuesFromRef = formData.value;
        const formDataToSubmit = new FormData(); // object that needs to be sent using Fetch

        for (const key in formValuesFromRef) {
          // looping over all the formData values defined above e.g. price, description etc.
          // appending them inside the FormData object that was created
          formDataToSubmit.append(key, formValuesFromRef[key]);
        }

        const houseId = formValuesFromRef.id;

        if (houseId) {
          await houseStore.editHouse(formDataToSubmit, houseId);
          if (imageUpload.value.files.length > 0) {
            const imageFile = imageUpload.value.files[0];
            const imageForm = new FormData();
            imageForm.append('image', imageFile);
            await houseStore.uploadImage(houseId, imageForm);
          } else if (!imagePreview.value) {
            imageError.value = 'Please select an image';
            return;
          }
          router.push({
            name: 'houseOverview',
            params: { houseId: houseId },
          });
        } else {
          const house = await houseStore.createHouse(formDataToSubmit);

          if (!house.id) {
            throw new Error('House ID is missing from the API response');
          }

          if (imageUpload.value.files.length > 0) {
            const imageFile = imageUpload.value.files[0];
            const imageForm = new FormData();
            imageForm.append('image', imageFile);
            await houseStore.uploadImage(house.id, imageForm);
          } else {
            imageError.value = 'Please select an image';
            return;
          }

          houseStore.houses.push(house);
          router.push({ name: 'houseOverview', params: { houseId: house.id } });
        }
      } catch (error) {
        console.error('Error creating house:', error);
        houseStore.error = error.message || 'An error occurred';
      } finally {
        houseStore.loading = false;
      }
    };

    return {
      triggerFileInput,
      imagePreview,
      handleImagePreview,
      clearImagePreview,
      handleSubmit,
      formData,
      imageUpload,
      imageError,
      houseStore,
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
  position: absolute;
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
}

.clear-icon-white {
  padding: 0;
  border: none;
  position: absolute;
  left: 9%;
}

.img-container {
  position: relative;
  height: 8.7rem;
}

.error-message {
  color: var(--primary-color);
  font-style: italic;
  font-size: 0.8rem;
  margin: 0.2rem;
  margin-top: -0.5rem;
  margin-bottom: 0.7rem;
}

.loading,
.error {
  font-style: italic;
  font-weight: var(--font-size-error-desktop);
  font-weight: 500;
}

@media (max-width: 376px) {
  form {
    flex-direction: column;
    padding: 1rem;
    margin-left: -7rem;
  }

  input,
  select,
  textarea {
    width: 80%;
    margin-bottom: 1rem;
  }

  .house-wrapper {
    flex-direction: column;
  }

  .house-wrapper input,
  .house-wrapper select {
    width: 65%;
  }

  .btn-post {
    width: 100%;
    margin-left: 0;
    font-size: var(--font-size-button-mobile);
  }

  .img-container {
    width: 6rem;
    height: auto;
    padding-bottom: 6rem;
  }

  #upload-icon {
    width: 0.7%;
    height: auto;
  }

  .image-preview {
    width: 8rem;
    height: 6.3rem;
  }

  .clear-icon-white {
    top: 0;
    left: 7rem;
    width: 1rem;
    height: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  .error-message {
    font-size: 0.9rem;
    margin: 0.5rem 0;
  }
}
</style>

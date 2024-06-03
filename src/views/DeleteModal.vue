<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Delete listing</h2>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone</p>
      <button class="btn-delete" @click="handleDelete">YES, DELETE</button>
      <br />
      <button class="btn-go-back" @click="handleGoBack">GO BACK</button>
    </div>
  </div>
</template>

<script>
import { useHouseStore } from '../stores/HouseStore';
import { useRouter } from 'vue-router';

export default {
  props: ['houseId', 'isModalVisible', 'goBack'],
  setup(props, { emit }) {
    const houseStore = useHouseStore();
    const router = useRouter();

    const handleDelete = () => {
      houseStore.deleteHouse(props.houseId);
      emit('close');
      if (props.goBack) {
        router.go(-1);
      }
    };

    const handleGoBack = () => {
      emit('close');
    };

    return { handleDelete, handleGoBack };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  width: 35rem;
  padding: 4rem;
  margin: 100px auto;
  border-radius: 10px;
  z-index: 1001;
  text-align: center;
  font-family: var(--font-primary);
}

.btn-delete,
.btn-go-back {
  color: var(--background-2);
  border: none;
  font-weight: bold;
  font-family: var(--font-primary);
  padding: 0.8rem;
  width: 24rem;
  font-size: var(--font-size-button-desktop);
  border-radius: 0.7rem;
  margin-right: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  background: var(--primary-color);
  position: relative;
}

.btn-delete {
  margin-top: 2rem;
}

.btn-go-back {
  background: var(--secondary-color);
}
</style>

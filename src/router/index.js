import { createRouter, createWebHistory } from 'vue-router';
import HousesView from '../views/HousesView.vue';
import AboutView from '../views/AboutView.vue';
import HouseOverview from '../views/HouseOverview.vue';
import CreateListing from '../views/CreateListing.vue';
import EditListing from '../views/EditListing.vue';
import DeleteModal from '../views/DeleteModal.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HousesView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/:houseId',
      name: 'houseOverview',
      component: HouseOverview,
      props: true,
    },
    {
      path: '/create',
      name: 'createListing',
      component: CreateListing,
    },
    {
      path: '/edit/:houseId',
      name: 'editListing',
      component: EditListing,
      props: true,
    },
  ],
});

export default router;

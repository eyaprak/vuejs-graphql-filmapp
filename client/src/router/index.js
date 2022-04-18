import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/HomeView';
import SingleMovieView from '../views/SingleMovieView';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'SingleMovie',
    component: SingleMovieView,
    props: (route) => ({ filmId: route.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/Home.vue';
import Settings from '../views/settings/Settings.vue';
import Gallery from '../views/gallery/Gallery.vue';
import Users from '../views/users/Users.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
  ],
});

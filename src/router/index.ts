import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/Home.vue';
import Settings from '../views/settings/Settings.vue';
import Gallery from '../views/gallery/Gallery.vue';
import Users from '../views/users/Users.vue';
import Groups from '../views/groups/Groups.vue';
import Auth from '../views/auth/Auth.vue';
import Login from '../components/login/Login.vue';
import Signup from '../components/signup/Signup.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: Gallery,
        },
        {
          path: '/profile',
          name: 'profile',
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
        {
          path: '/groups',
          name: 'groups',
          component: Groups,
        },
      ],
    },
    {
      path: '/auth',
      components: {
        notLoggedIn: Auth,
      },
      children: [
        {
          path: '',
          component: Login,
          meta: {
            auth: false,
          },
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            auth: false,
          },
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup,
          meta: {
            auth: false,
          },
        },
      ],
    },
  ],
});

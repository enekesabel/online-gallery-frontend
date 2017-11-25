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
      meta: {
        auth: true,
      },
      children: [
        {
          path: '',
          redirect: '/albums',
        },
        {
          path: '/profile',
          name: 'profile',
          component: Settings,
        },
        {
          path: '/albums/*',
          name: 'albums',
          component: Gallery,
          props: route => ({
            albumId: route.params[0],
          }),
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
      meta: {
        auth: false,
      },
      children: [
        {
          path: '',
          component: Login,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/signup',
          name: 'signup',
          component: Signup,
        },
      ],
    },
  ],
});

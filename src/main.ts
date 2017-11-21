// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Element from 'element-ui';
import VueAuth from '@websanova/vue-auth';

import './hooks'; // This must be imported before any component

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(VueAxios, axios);

Vue.router = router
Vue.axios.defaults.baseURL = process.env.API_URL;
Vue.prototype.baseUrl = Vue.axios.defaults.baseURL;

Vue.use(VueAuth, {
  auth: {
    request (req, token) {
      /*
      this.options.http._setHeaders.call(this, req, {
        Authorization: 'Bearer ' + token,
      });
      */
    },
    response (res) {
      // Get Token from response body
      // return res.data.token;
    },
  },
  authRedirect: '/login',
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: '/users/login', fetchUser: true},
  logoutData: {url: '/users/logout', method: 'GET', makeRequest: true},
  registerData: {url: '/users/register', method: 'POST', redirect: '/gallery'},
  fetchData: {enabled: true},
  parseUserData (data) {
    return data.data;
  },
});


// tslint:disable-next-line:no-unused-expression
new Vue({
  router,
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});

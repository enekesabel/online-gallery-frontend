// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Element from 'element-ui';
import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';

import './hooks'; // This must be imported before any component

import App from './App.vue';
import router from './router';
import store from './store';
import locale from 'element-ui/lib/locale/lang/en';

Vue.config.productionTip = false;

Vue.use(Element, { locale });

// tslint:disable-next-line:no-unused-expression
new Vue({
  router,
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});

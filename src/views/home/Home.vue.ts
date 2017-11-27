import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Home.html?style=./Home.scss';

@WithRender
@Component
export default class Home extends Vue {
  logout() {
    this.$auth.logout({
      redirect: '/login',
    });
  }

  mounted() {
    this.$store.dispatch('fetchUsers');
    console.log('auth', this.$auth);
  }

}

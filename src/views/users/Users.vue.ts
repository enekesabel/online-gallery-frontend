import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Users.html?style=./Users.scss';
import UserComponent from '../../components/user/User.vue';
import {User} from '../../model/User';

@WithRender
@Component({
  components: {UserComponent},
})
export default class Users extends Vue {

  get users(): User[] {
    return this.$store.getters.getUsers;
  }

  mounted() {
    this.$store.dispatch('fetchUsers');
  }

}

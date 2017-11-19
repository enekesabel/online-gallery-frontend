import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Groups.html?style=./Groups.scss';
import {Group} from '../../model/Group';
import UserComponent from '../../components/user/User.vue';

@WithRender
@Component({
  components: {UserComponent},
})
export default class Groups extends Vue {

  get groups(): Group[] {
    return this.$store.getters.getGroups;
  }

  editGroup(group: Group) {
    console.log('editing group: ' + group.name);
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Groups.html?style=./Groups.scss';
import {Group} from '../../model/Group';
import UserComponent from '../../components/user/User.vue';
import GroupEditor from '../../components/group_editor/GroupEditor.vue';

@WithRender
@Component({
  components: {UserComponent, GroupEditor},
})
export default class Groups extends Vue {

  private editDialogVisible: boolean = false;
  private selectedGroup: Group;

  get groups(): Group[] {
    return this.$store.getters.getGroups;
  }

  editGroup(group: Group) {
    this.selectedGroup = group;
    this.editDialogVisible = true;
  }
}

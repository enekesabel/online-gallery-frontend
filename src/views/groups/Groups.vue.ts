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
  private editDialogTitle: string = 'Editing group';

  created() {
    this.$store.dispatch('fetchGroups');
  }

  get groups(): Group[] {
    return this.$store.getters.getOwnedGroups;
  }

  editGroup(group: Group) {
    this.editDialogTitle = 'Editing group';
    this.selectedGroup = group;
    this.editDialogVisible = true;
  }

  createGroup() {
    this.selectedGroup = new Group();
    this.editDialogTitle = 'Creating group';
    this.editDialogVisible = true;
  }

  deleteGroup(group: Group) {
    this.$confirm('This will permanently delete the group. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => {
      this.$store.dispatch('deleteGroup', {groupId: group.id});
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete canceled',
      });
    });
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './GroupEditor.html?style=./GroupEditor.scss';

import {Prop} from 'vue-property-decorator';
import {Group} from '../../model/Group';
import {User} from '../../model/User';

@WithRender
@Component
export default class GroupEditor extends Vue {
  @Prop()
  private group: Group;

  private selectedUserIds = [];

  mounted() {
    this.group.users.forEach(u => {
      this.selectedUserIds.push(u.id);
    });
  }

  get titles() {
    return ['Users', this.group.name];
  }

  get users(): User[] {
    if (this.$store) {
      return this.$store.getters.getUsers;
    } else {
      return [];
    }
  }

  get parsedUsers() {
    const data = [];
    this.users.forEach(u => {
      data.push({
        key: u.id,
        label: u.name,
      });
    });

    return data;
  }

}

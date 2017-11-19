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
  private form = {
    name: '',
  };
  private rules = {
    name: [
      {required: true, message: 'Please input the group name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
  };

  mounted() {
    this.group.users.forEach(u => {
      this.selectedUserIds.push(u.id);
    });
    this.form.name = this.group.name;
  }

  save() {
    this.$refs.form.validate((valid) => {
      if (valid) {
        this.$emit('saved');
      } else {
        console.log('error submit!!');
        return false;
      }
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

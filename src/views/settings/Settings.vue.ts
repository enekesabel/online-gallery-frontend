import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Settings.html?style=./Settings.scss';
import {User} from '../../model/User';

@WithRender
@Component
export default class Settings extends Vue {

  private settingsForm = {
    name: '',
    password: '',
    passwordConfirm: '',
  };

  private rules = {
    name: [
      {required: true, message: 'Please input your full name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
    password: [
      {required: true, message: 'Please input your password'},
    ],
    passwordConfirm: [
      {validator: this.validatePass, trigger: 'blur'},
      {required: true, message: 'Please input password confirmation'},
    ],
  };

  mounted() {
    this.settingsForm.name = this.user.name;
  }

  get user() {
    return this.$auth.user();
  }

  validatePass(rule, value, callback) {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== this.settingsForm.password) {
      callback(new Error('Two inputs don\'t match!'));
    } else {
      callback();
    }
  }

  save() {
    this.$refs.settingsForm.validate((valid) => {
      if (valid) {
        const userOptions: any = {};
        userOptions.name = this.settingsForm.name;
        userOptions.password = this.settingsForm.password;
        this.$store.dispatch('updateUser', new User(userOptions));
      } else {
        return false;
      }
    });
  }
}

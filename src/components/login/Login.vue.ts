import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Login.html?style=./Login.css';

import {Prop} from 'vue-property-decorator';

@WithRender
@Component
export default class Login extends Vue {

  private loginForm = {
    email: '',
    password: '',
  };

  private rules = {
    email: [
      {required: true, message: 'Please input your email address', trigger: 'blur'},
      {type: 'email', message: 'Please input a valid email address', trigger: 'blur'},
    ],
    password: [
      {required: true, message: 'Please input your password'},
    ],
  };

  login() {
    this.$refs.loginForm.validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}

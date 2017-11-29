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
        this.$auth.login({
          data: this.loginForm,
          headers: {
            'Content-type': 'application/json',
          },
          success(res) {
            Vue.axios.get('/users/' + res.data.id).then(response => {
              this.$auth.user(response.data);
            });
          },
          error(err) {
            this.$message({
              type: 'error',
              message: 'Wrong username or password',
            });
          },
        });
      } else {
        return false;
      }
    });
  }
}

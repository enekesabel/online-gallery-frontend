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
      {required: true, message: 'Please input your emailAddress address', trigger: 'blur'},
      {type: 'email', message: 'Please input a valid emailAddress address', trigger: 'blur'},
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
          success(re) {
            Vue.axios({
              url: '/usergroups',
              method: 'GET',
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          },
          error(err) {
            this.$message({
              type: 'error',
              message: 'Wrong username or password',
            });
          },
        });
        /*
        Vue.axios.post('/users/login', this.loginForm, {withCredentials: true}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
        */
      } else {
        return false;
      }
    });
  }
}

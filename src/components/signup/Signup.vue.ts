import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Signup.html?style=./Signup.css';

@WithRender
@Component
export default class Signup extends Vue {

  private signupForm = {
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  };

  private rules = {
    email: [
      {required: true, message: 'Please input your email address', trigger: 'blur'},
      {type: 'email', message: 'Please input a valid email address', trigger: 'blur'},
    ],
    name: [
      {required: true, message: 'Please input your full name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
    password: [
      {required: true, message: 'Please input your password'},
    ],
    passwordConfirm: [
      { validator: this.validatePass, trigger: 'blur' },
      {required: true, message: 'Please input password confirmation'},
    ],
  };

  validatePass(rule, value, callback) {
    if (value === '') {
      callback(new Error('Please input the password again'));
    } else if (value !== this.signupForm.password) {
      callback(new Error('Two inputs don\'t match!'));
    } else {
      callback();
    }
  }

  signup() {
    this.$refs.signupForm.validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}

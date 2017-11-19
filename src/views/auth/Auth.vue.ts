import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Auth.html?=./Auth.scss';

@WithRender
@Component
export default class Users extends Vue {
}

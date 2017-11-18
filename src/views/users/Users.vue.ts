import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Users.html?style=./Users.scss';

@WithRender
@Component
export default class Users extends Vue {
}

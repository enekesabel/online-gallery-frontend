import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './User.html?style=./User.scss';

import {Prop} from 'vue-property-decorator';
import {User} from '../../model/User';

@WithRender
@Component
export default class UserComponent extends Vue {
  @Prop()
  user: User;
}

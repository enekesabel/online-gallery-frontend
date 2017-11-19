import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Home.html?style=./Home.scss';

import { Prop } from 'vue-property-decorator';

@WithRender
@Component
export default class Home extends Vue {
  @Prop({ type: Boolean, default: true })
  links: boolean;

  @Prop({ type: Boolean, default: true })
  ecosystem: boolean;

}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';

import {Prop} from 'vue-property-decorator';
import {Album} from '../../model/Album';

@WithRender
@Component
export default class Gallery extends Vue {
  @Prop({
    required: false,
  })
  private root: Album;
}

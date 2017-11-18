import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './ImageView.html?style=./ImageView.scss';

import {Prop} from 'vue-property-decorator';
import {Image} from '../../model/Image';

@WithRender
@Component
export default class AlbumPreview extends Vue {
  @Prop()
  image: Image;

}

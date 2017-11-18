import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './ImagePreview.html?style=./ImagePreview.scss';

import { Prop } from 'vue-property-decorator';
import {DocumentBase} from '../../model/DocumentBase';

@WithRender
@Component
export default class AlbumPreview extends Vue {
  @Prop()
  document: DocumentBase;

}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './ImagePreview.html?style=./ImagePreview.scss';

import {Prop} from 'vue-property-decorator';
import ImageView from '../image_view/ImageView.vue';
import {PictureBase} from '../../model/PictureBase';

@WithRender
@Component({
  components: {
    ImageView,
  },
})
export default class ImagePreview extends Vue {
  @Prop()
  document: PictureBase;

  private dialogVisible = false;

  get imageUrl() {
    return Vue.prototype.staticUrl + '/' + (this.document.thumbnailName || this.document.name);
  }

  openImage() {
    this.dialogVisible = true;
  }
}

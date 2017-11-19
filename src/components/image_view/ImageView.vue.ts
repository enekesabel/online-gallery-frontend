import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './ImageView.html?style=./ImageView.scss';

import {Prop} from 'vue-property-decorator';
import {Image} from '../../model/Image';
import Comments from '../../components/comments/Comments.vue';

@WithRender
@Component({
  components: {
    Comments,
  },
})
export default class ImageView extends Vue {
  @Prop()
  image: Image;

}
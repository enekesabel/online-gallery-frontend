import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Comments.html?style=./Comments.css';

import {Prop} from 'vue-property-decorator';
import CommentComponent from '../comment/Comment.vue';
import {Picture} from '../../model/Picture';

@WithRender
@Component({
  components: {CommentComponent},
})
export default class Comments extends Vue {
  @Prop()
  private picture: Picture;

  private newComment: string = '';

  addComment() {

  }
}

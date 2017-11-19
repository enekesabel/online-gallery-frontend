import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Comments.html?style=./Comments.css';

import {Prop} from 'vue-property-decorator';
import {Document} from '../../model/Document';
import CommentComponent from '../comment/Comment.vue';

@WithRender
@Component({
  components: {CommentComponent},
})
export default class Comments extends Vue {
  @Prop()
  private document: Document;

  private newComment: string = '';

  addComment() {

  }
}

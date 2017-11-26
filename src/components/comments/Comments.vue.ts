import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Comments.html?style=./Comments.css';

import {Prop} from 'vue-property-decorator';
import CommentComponent from '../comment/Comment.vue';
import {Picture} from '../../model/Picture';
import {Comment} from '../../model/Comment';

@WithRender
@Component({
  components: {CommentComponent},
})
export default class Comments extends Vue {
  @Prop()
  private picture: Picture;

  private newComment: string = '';

  addComment() {
    this.$store.dispatch('commentPicture', new Comment({
      id: null,
      pictureId: this.picture.id,
      content: this.newComment,
      createdAt: new Date().toDateString(),
      userId: null,
    }));
    this.newComment = '';
  }

}

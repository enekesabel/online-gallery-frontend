import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Comment.html?style=./Comment.scss';

import {Prop} from 'vue-property-decorator';
import {Comment} from '../../model/Comment';
import moment from 'moment';

@WithRender
@Component
export default class CommentComponent extends Vue {
  @Prop()
  comment: Comment;

  get userName() {
    const user = this.$store.getters.getUsers.find(u => {
      return u.id === this.comment.userId;
    });
    return user.name;
  }

  get date() {
    return moment(this.comment.createdAt).format('YYYY. MM. DD. hh:mm:ss');
  }

  removeComment() {
    this.$store.dispatch('deleteComment', this.comment);
  }

  get userId() {
    return this.$auth.user().id;
  }
}

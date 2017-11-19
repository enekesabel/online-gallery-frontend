import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Comment.html?style=./Comment.scss';

import {Prop} from 'vue-property-decorator';
import {Comment} from '../../model/Comment';

@WithRender
@Component
export default class CommentComponent extends Vue {
  @Prop()
  comment: Comment;
}

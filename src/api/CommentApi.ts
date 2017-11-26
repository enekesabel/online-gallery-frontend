import {AbstractApi} from './AbstractApi';
import {Comment} from '../model/Comment';
import Vue from 'vue';

export class CommentApi extends AbstractApi<Comment> {

  constructor() {
    super('/comments');
  }

}

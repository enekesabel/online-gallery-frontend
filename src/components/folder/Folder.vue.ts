import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Folder.html?./Folder.css';

import { Prop } from 'vue-property-decorator';
import {Album} from '../../model/Album';

@WithRender
@Component
export default class Folder extends Vue {
  @Prop()
  album: Album;

}

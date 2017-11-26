import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './AlbumPreview.html?style=./AlbumPreview.scss';
import {Prop} from 'vue-property-decorator';
import {AlbumBase} from '../../model/AlbumBase';

@WithRender
@Component
export default class AlbumPreview extends Vue {
  @Prop({
    default: new AlbumBase()
  })
  document: AlbumBase;

  openAlbum() {
    this.$router.push((this.$route.path + '/' + this.document.name).replace('//', '/'));
  }

}

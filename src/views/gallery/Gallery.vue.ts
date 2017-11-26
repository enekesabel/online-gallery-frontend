import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';
import Comments from '../../components/comments/Comments.vue';
import {Album} from '../../model/Album';
import {AlbumBase} from '../../model/AlbumBase';
import {PictureBase} from '../../model/PictureBase';
import {Prop, Watch} from 'vue-property-decorator';

@WithRender
@Component({
  components: {
    DocumentPreview,
    Comments,
  },
})
export default class Gallery extends Vue {

  @Prop({
    default: '',
  })
  private albumId: string;

  get childAlbums(): AlbumBase[] {
    return this.$store.getters.getChildAlbums;
  }

  get pictures(): PictureBase[] {
    return this.$store.getters.getPictures;
  }

  get album(): Album {
    return this.$store.getters.getAlbum;
  }

  get breadcrumbs() {
    const breadcrumbs = [];
    for (let i = 0; i < this.album.albumTree.length; i++) {
      const name = this.album.albumTree[i].name;
      const lastBreadcrumb = breadcrumbs[i - 1] || {
        name: '',
        path: '/albums',
      };

      breadcrumbs.push({
        name,
        path: lastBreadcrumb.path + '/' + name,
      });
    }
    return breadcrumbs;
  }

  handleCommand(command) {
    switch (command) {
    }
  }

  mounted() {
    this.fetchAlbum();
  }

  @Watch('albumId')
  fetchAlbum() {
    // load child album when routing to it
    this.$store.dispatch('fetchDocument', this.albumId);
  }

}

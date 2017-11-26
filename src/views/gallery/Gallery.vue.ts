import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';
import Comments from '../../components/comments/Comments.vue';
import {Album} from '../../model/Album';
import {AlbumBase} from '../../model/AlbumBase';
import {PictureBase} from '../../model/PictureBase';
import {Prop, Watch} from 'vue-property-decorator';
import dashify from 'dashify';
import {ShareType} from '../../model/ShareType';
import {DocumentType} from '../../model/DocumentType';

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
  private createAlbumDialogVisible: boolean = false;
  private newAlbumForm = {
    name: '',
  };
  private rules = {
    name: [
      {required: true, message: 'Please input your the album name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
  };

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
      case 'add':
        this.createAlbumDialogVisible = true;
    }
  }

  createAlbum() {
    this.$refs.newAlbumForm.validate((valid) => {
      if (valid) {
        this.$store.dispatch('createAlbum', new AlbumBase({
          id: null,
          type: DocumentType.ALBUM,
          name: dashify(this.newAlbumForm.name),
          displayName: this.newAlbumForm.name,
          ownerUserId: null,
          shareType: ShareType.PUBLIC,
          childCount: 0,
          parentAlbumId: this.album.id === '' ? null : this.album.id,
        }));
        this.createAlbumDialogVisible = false;
      }
    });
  }

  cancelCreateAlbum() {
    this.createAlbumDialogVisible = false;
  }

  onClose() {
    this.$refs.newAlbumForm.resetFields();
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

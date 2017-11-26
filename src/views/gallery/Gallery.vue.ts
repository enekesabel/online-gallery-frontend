import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';
import Comments from '../../components/comments/Comments.vue';
import MessageBus from '../../components/message_bus/MessageBus.vue';
import {Album} from '../../model/Album';
import {AlbumBase} from '../../model/AlbumBase';
import {PictureBase} from '../../model/PictureBase';
import {Prop, Watch} from 'vue-property-decorator';
import dashify from 'dashify';
import {ShareType} from '../../model/ShareType';
import {DocumentType} from '../../model/DocumentType';
import { Message } from 'element-ui';

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

  private fileList = [];

  get fileUploadData() {
    return {
      albumId: this.album.id,
      filesToUpload: this.fileList,
    };
  }

  get fileUploadHeaders() {
    return {
      Authorization: 'Bearer ' + this.$auth.token(),
    };
  }

  get fileUploadAction() {
    return Vue.axios.defaults.baseURL + '/pictures';
  }

  get childAlbums(): AlbumBase[] {
    return this.album.childAlbums;
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

  beforeFileUpload() {
    this.$message({
      type: 'info',
      iconClass: 'el-icon-loading',
      dangerouslyUseHTMLString: true,
      duration: 0,
      message: '<span class="ml-2">Your images are being uploaded.</span>',
    });
  }

  onFileUploadError() {
    Message.closeAll();
    MessageBus.showError('Error occurred during file upload.');
    this.fetchAlbum();
  }

  onFileUploadSuccess() {
    Message.closeAll();
    MessageBus.showSuccess('Files uploaded successfully');
    this.fetchAlbum();
  }

  @Watch('albumId')
  fetchAlbum() {
    // load child album when routing to it
    this.$store.dispatch('fetchDocument', this.albumId);
  }

}

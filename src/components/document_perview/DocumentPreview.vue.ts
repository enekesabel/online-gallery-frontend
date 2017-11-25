import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './DocumentPreview.html';
import {Prop} from 'vue-property-decorator';
import {DocumentBase} from '../../model/DocumentBase';
import {DocumentType} from '../../model/DocumentType';
import AlbumPreview from '../album_preview/AlbumPreview.vue';
import ImagePreview from '../image_preview/ImagePreview.vue';

@WithRender
@Component({
  components: {
    AlbumPreview,
    ImagePreview,
  },
})
export default class DocumentPreview extends Vue {
  @Prop({
    required: true,
  })
  private document: DocumentBase;
  private documentName: string = '';

  mounted() {
    this.documentName = this.document.displayName || this.document.name || '';
  }

  get componentToCreate() {
    if (this.document.type === DocumentType.PICTURE) {
      return 'image-preview';
    } else {
      return 'album-preview';
    }
  }

  handleCommand(command) {
    switch (command) {
      case 'delete':
        this.openDeleteConfirmation();
        break;
      case 'rename':
        this.renameDocument();
        break;
    }
  }

  renameDocument() {

  }

  openDeleteConfirmation() {
    this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => {
      this.$store.dispatch('deleteDocument', this.document.id);
    }).catch(() => {
      this.$message({
        type: 'info',
        message: 'Delete canceled',
      });
    });
  }

}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './DocumentPreview.html';
import {Prop, Watch} from 'vue-property-decorator';
import {DocumentBase} from '../../model/DocumentBase';
import {DocumentType} from '../../model/DocumentType';
import AlbumPreview from '../album_preview/AlbumPreview.vue';
import ImagePreview from '../image_preview/ImagePreview.vue';
import dashify from 'dashify';
import {AlbumBase} from '../../model/AlbumBase';
import {Picture} from "../../model/Picture";

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
    default: new AlbumBase(),
  })
  private document: DocumentBase;
  private renameAlbumDialogVisible: boolean = false;

  private documentNameForm = {
    documentName: '',
  };

  private rules = {
    documentName: [
      {required: true, message: 'Please input the album name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
  };

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
      case 'download':
        this.downloadDocument();
        break;
    }
  }

  downloadDocument() {
    if (this.document.type === DocumentType.ALBUM) {
      this.$store.dispatch('downloadAlbum', this.document);
    } else {
      const a = document.createElement('a');
      a.style = 'display: none';
      a.href = (<Picture>this.document).imageUrl;
      a.download = (<Picture>this.document).name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  saveDocumentName() {
    this.$refs.documentNameForm.validate((valid) => {
      if (valid) {
        this.$store.dispatch('renameAlbum', {
          albumId: this.document.id,
          newName: dashify(this.documentNameForm.documentName),
          newDisplayName: this.documentNameForm.documentName,
        });
        this.renameAlbumDialogVisible = false;
      }
    });
  }

  renameDocument() {
    this.renameAlbumDialogVisible = true;
    this.documentNameForm.documentName = this.document.displayName || this.document.name || '';
  }

  cancelRename() {
    this.$refs.documentNameInput.resetFields();
    this.renameAlbumDialogVisible = false;
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

  @Watch('document.displayName', {
    immediate: true,
    deep: true,
  })
  onDocumentNameChange(val) {
    this.documentNameForm.documentName = val;
  }

}

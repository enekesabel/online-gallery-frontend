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
import {PictureBase} from "../../model/PictureBase";
import {PictureBaseOptions} from "../../model/PictureBaseOptions";
import {PictureOptions} from 'model/PictureOptions';

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
  private editPictureDialogVisible: boolean = false;

  private albumForm = {
    documentName: '',
  };

  private rules = {
    pictureName: [
      {required: true, message: 'Please input the album name', trigger: 'blur'},
      {min: 3, message: 'Length should be at least 3 characters', trigger: 'blur'},
    ],
  };

  private pictureForm = {
    pictureName: '',
    description: '',
  };

  private pictureRules = {
    pictureName: [
      {required: true, message: 'Please input the picture name', trigger: 'blur'},
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
      case 'edit':
        this.editDocument();
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

  saveDocument() {
    if (this.document.type === DocumentType.PICTURE) {
      this.$refs.pictureForm.validate((valid) => {
        if (valid) {
          const newPictureOptions: PictureOptions = Object.assign({}, (<Picture>this.document).toObject(), {
            displayName: this.pictureForm.pictureName,
            description: this.pictureForm.description,
          });

          this.$store.dispatch('updatePicture', new Picture(newPictureOptions));
          this.editPictureDialogVisible = false;
        }
      });
    } else {
      this.$refs.albumForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('renameAlbum', {
            albumId: this.document.id,
            newName: dashify(this.albumForm.documentName),
            newDisplayName: this.albumForm.documentName,
          });
          this.renameAlbumDialogVisible = false;
        }
      });
    }
  }

  editDocument() {
    if (this.document.type === DocumentType.PICTURE) {
      this.editPictureDialogVisible = true;
      this.pictureForm.pictureName = this.document.displayName || this.document.name || '';
      this.pictureForm.description = (<Picture>this.document).description || '';
    } else {
      this.renameAlbumDialogVisible = true;
      this.albumForm.documentName = this.document.displayName || this.document.name || '';
    }
  }

  cancelEdit() {
    this.$refs.pictureForm && this.$refs.pictureForm.resetFields();
    this.$refs.albumForm && this.$refs.albumForm.resetFields();
    this.renameAlbumDialogVisible = false;
    this.editPictureDialogVisible = false;
  }

  openDeleteConfirmation() {
    this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }).then(() => {
      if (this.document.type === DocumentType.ALBUM) {
        this.$store.dispatch('deleteAlbum', this.document.id);
      } else {
        this.$store.dispatch('deletePicture', this.document.id);
      }
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
    this.albumForm.documentName = val;
  }

}

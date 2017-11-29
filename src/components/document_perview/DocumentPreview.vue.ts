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
import {Picture} from '../../model/Picture';
import {PictureOptions} from 'model/PictureOptions';
import {Share} from '../../model/Share';
import {User} from '../../model/User';
import {Group} from 'model/Group';
import {DocumentShareType} from '../../model/ShareOptions';

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
  private moveDialogVisible: boolean = false;
  private shareDialogVisible: boolean = false;
  private sharedUserIds: string[] = [];
  private sharedGroupIds: string[] = [];

  private defaultProps = {
    children: 'childAlbums',
    label: 'displayName',
  };

  private selectedAlbumId;

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

  mounted() {
    this.selectedAlbumId = this.document.id;
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
      case 'edit':
        this.editDocument();
        break;
      case 'download':
        this.downloadDocument();
        break;
      case 'move':
        this.moveDialogVisible = true;
        break;
      case 'share':
        this.shareDialogVisible = true;
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

  get albumHierarchy() {
    return this.$store.getters.getAlbumHierarchy;
  }

  onMoveDialogOpen() {
    this.$store.dispatch('fetchAlbumHierarchy');
  }

  moveDocument() {
    if (this.selectedAlbumId !== this.document.id) {
      if (this.document.type === DocumentType.ALBUM) {
        this.$store.dispatch('moveAlbum', {album: this.document, newParentId: this.selectedAlbumId});
      } else {
        this.$store.dispatch('movePicture', {picture: this.document, newParentId: this.selectedAlbumId});
      }
    }
    this.moveDialogVisible = false;
    this.selectedAlbumId = this.document.id;
  }

  cancelMove() {
    this.moveDialogVisible = false;
    this.selectedAlbumId = this.document.id;
  }

  selectAlbum(data) {
    this.selectedAlbumId = data.id;
  }


  get shares(): Share[] {
    return this.$store.getters.getShares;
  }

  get users(): User[] {
    if (this.$store) {
      return this.$store.getters.getUsers;
    } else {
      return [];
    }
  }

  get groups(): Group[] {
    if (this.$store) {
      return this.$store.getters.getOwnedGroups;
    } else {
      return [];
    }
  }

  get usersSharedWithIds(): string[] {
    const users = [];
    this.shares.forEach(s => {
      if (s.shareType === DocumentShareType.PERSON) {
        const user = this.users.find(u => {
          return u.id === s.sharedWithId;
        });
        users.push(user.id);
      }
    });
    return users;
  }

  get groupsSharedWithIds(): string[] {
    const groups = [];
    this.shares.forEach(s => {
      if (s.shareType === DocumentShareType.GROUP) {
        const group = this.groups.find(g => {
          return g.id === s.sharedWithId;
        });
        groups.push(group.id);
      }
    });
    return groups;
  }

  get newUserShareIdsToAdd(): string[] {
    const userIdsToAdd = [];
    this.sharedUserIds.forEach(id => {
      if (this.usersSharedWithIds.indexOf(id) === -1) {
        userIdsToAdd.push(id);
      }
    });
    return userIdsToAdd;
  }

  get newGroupShareIdsToAdd(): string[] {
    const groupIdsToAdd = [];
    this.sharedGroupIds.forEach(id => {
      if (this.groupsSharedWithIds.indexOf(id) === -1) {
        groupIdsToAdd.push(id);
      }
    });
    return groupIdsToAdd;
  }

  get groupShareIdsToRemove(): string[] {
    const groupIdsToRemove = [];
    this.groupsSharedWithIds.forEach(id => {
      if (this.sharedGroupIds.indexOf(id) === -1) {
        groupIdsToRemove.push(id);
      }
    });
    const shareIdsToRemove = [];
    this.shares.forEach(share => {
      if (share.shareType === DocumentShareType.GROUP &&
        groupIdsToRemove.indexOf(share.sharedWithId) !== -1) {
        shareIdsToRemove.push(share.id);
      }
    });
    return shareIdsToRemove;
  }

  get userShareIdsToRemove(): string[] {
    const userIdsToRemove = [];
    this.usersSharedWithIds.forEach(id => {
      if (this.sharedUserIds.indexOf(id) === -1) {
        userIdsToRemove.push(id);
      }
    });
    const shareIdsToRemove = [];
    this.shares.forEach(share => {
      if (share.shareType === DocumentShareType.PERSON &&
        userIdsToRemove.indexOf(share.sharedWithId) !== -1) {
        shareIdsToRemove.push(share.id);
      }
    });
    return shareIdsToRemove;
  }

  get parsedUsers() {
    const data = [];
    this.users.forEach(u => {
      data.push({
        key: u.id,
        label: u.name,
      });
    });
    return data;
  }

  get parsedGroups() {
    const data = [];
    this.groups.forEach(u => {
      data.push({
        key: u.id,
        label: u.name,
      });
    });
    return data;
  }

  async onShareDialogOpen() {
    await this.$store.dispatch('fetchSharesOfDocument', this.document);
    await this.$store.dispatch('fetchUsers', this.document);
    await this.$store.dispatch('fetchGroups', this.document);
    this.sharedGroupIds = this.groupsSharedWithIds;
    this.sharedUserIds = this.usersSharedWithIds;
  }

  cancelShare() {
    this.shareDialogVisible = false;
    this.sharedUserIds = [];
    this.sharedGroupIds = [];
  }

  shareDocument() {
    this.$store.dispatch('shareDocument', {userIds: this.newUserShareIdsToAdd.slice(), groupIds: this.newGroupShareIdsToAdd.slice(), document:this.document});
    this.$store.dispatch('removeShares', {userIds: this.userShareIdsToRemove.slice(), groupIds: this.groupShareIdsToRemove.slice()});
    this.shareDialogVisible = false;
    this.sharedUserIds = [];
    this.sharedGroupIds = [];
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

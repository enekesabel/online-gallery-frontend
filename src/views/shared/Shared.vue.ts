import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Shared.html';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';
import {Picture} from '../../model/Picture';
import {User} from '../../model/User';

@WithRender
@Component({
  components: {
    DocumentPreview,
  },
})
export default class Shared extends Vue {

  mounted() {
    this.$store.dispatch('fetchSharedWithMe');
  }

  get sharedWithMe(): Picture[][] {
    if (this.$store) {
      return this.$store.getters.getSharedWithMe;
    } else {
      return [];
    }
  }

  get users(): User[] {
    if (this.$store) {
      return this.$store.getters.getUsers;
    } else {
      return [];
    }
  }

  get parsedShares() {
    const shares = [];
    this.sharedWithMe.forEach(pictureArr => {
      const owner = this.users.find(u => {
        return u.id === pictureArr[0].ownerUserId;
      });

      const pictures = [];
      pictureArr.forEach(picture => {
        pictures.push(picture);
      });

      shares.push({
        name: owner.name,
        pictures,
      });

    });

    return shares;
  }

}

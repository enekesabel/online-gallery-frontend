import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import {DocumentBase} from '../../model/DocumentBase';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';
import Comments from '../../components/comments/Comments.vue';
import {Document} from '../../model/Document';

@WithRender
@Component({
  components: {
    DocumentPreview,
    Comments,
  },
})
export default class Gallery extends Vue {

  get children(): DocumentBase[] {
    return this.$store.getters.getChildren;
  }

  get document(): Document {
    return this.$store.getters.getDocument;
  }


  handleCommand(command) {
    switch (command) {
    }
  }

}

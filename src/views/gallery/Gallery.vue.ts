import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import {DocumentBase} from '../../model/DocumentBase';
import DocumentPreview from '../../components/document_perview/DocumentPreview.vue';

@WithRender
@Component({
  components: {
    DocumentPreview,
  },
})
export default class Gallery extends Vue {

  get children(): DocumentBase[] {
    return this.$store.getters.getChildren;
  }
}

import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './Gallery.html?style=./Gallery.scss';
import Folder from '../../components/folder/Folder.vue';
import {Prop} from 'vue-property-decorator';
import {Album} from '../../model/Album';
import {DocumentBase} from '../../model/DocumentBase';

@WithRender
@Component({
  components: {
    Folder,
  },
})
export default class Gallery extends Vue {

  get children(): DocumentBase[] {
    return this.$store.getters.getChildren;
  }
}

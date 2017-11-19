import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './App.html?style=./App.scss';

@WithRender
@Component
export default class App extends Vue {

  mounted() {
    this.$store.dispatch('fetchDocument', {documentId: ''});
  }

}

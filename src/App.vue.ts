import Vue from 'vue';
import Component from 'vue-class-component';
import MessageBus from './components/message_bus/MessageBus.vue';
import WithRender from './App.html?style=./App.scss';

@WithRender
@Component
export default class App extends Vue {

  private messageBus = MessageBus;

  mounted() {
    this.$store.dispatch('fetchDocument', {documentId: ''});
    this.$store.dispatch('fetchUsers');
  }

}

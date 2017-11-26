import Vue from 'vue';

class MessageBus extends Vue {

  showError(message: string) {
    this.$message({
      type: 'error',
      message,
    });
  }

  showSuccess(message: string) {
    this.$message({
      type: 'success',
      message,
    });
  }
}

export default new MessageBus();

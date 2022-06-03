<template>
  <input v-model="inputText" @keydown.enter="newItem" placeholder="What are you going to do?" ref="input" />
</template>

<script>
  export default {
    data() {
      return {
        inputText: "",
      };
    },

    methods: {
      async newItem() {
        if (!this.inputText.trim()) {
          this.$refs.input.focus();
          return;
        }
        await this.$store.dispatch("createListItem", this.inputText);
        this.inputText = "";
      },
    },
  };
</script>

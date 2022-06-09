<template>
  <div class="text-5xl mx-auto my-10">Things To Do</div>
  <input
    v-model="inputText"
    @keydown.enter="newItem"
    placeholder="Please press enter to add list"
    ref="inputArea"
    class="placeholder:italic w-8/12 rounded-md py-2 pl-9"
  />
  <hr class="my-10" />
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
      try {
        if (!this.inputText.trim()) {
          console.log(this.$refs.inputArea);
          this.inputText = "";
          this.$refs.inputArea.focus();
          return;
        }
        await this.$store.dispatch("createListItem", this.inputText);
        await this.$store.dispatch("fetchLists");
        this.inputText = "";
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

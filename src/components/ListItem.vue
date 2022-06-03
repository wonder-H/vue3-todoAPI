<template>
  <!-- <h3>{{item}}</h3> -->
  <div class="itemBox" :class="{ checked: item.isDone }">
    <div v-if="!isEditMode">
      <h2 @click="this.$store.commit('changeActive', item)">{{ item.text }}</h2>
      <span>{{ item.order }}</span>
      <p>{{ item.createdDate }}</p>
      <p>{{ item.editDate }}</p>
      <button
        @click="
          toggleMode();
          editItem(item);
        "
      >
        Edit
      </button>
      <button @click="deleteItem(item)">X</button>
    </div>
    <div v-else>
      <input
        type="text"
        v-model="editText"
        @keydown.esc="toggleMode"
        @keydown.enter="
          toggleMode();
          editData($event.target.value, item);
        "
      />
      <button @click="toggleMode">X</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["item"],

    data() {
      return { isEditMode: false, editText: "" };
    },
    methods: {
      toggleMode() {
        this.isEditMode = !this.isEditMode;
        this.editText = "";
      },
      editItem(item) {
        this.editText = item.text;
      },
      deleteItem(item) {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          this.$store.dispatch("deleteItem", item);
        }
      },
      editData(editText, item) {
        const text = editText.trim();
        if (!text || text === item.text) {
          console.log("text: ", text, "item", item.text);
          this.isEditMode = false;
        } else {
          this.$store.dispatch("editItem", { ...item, editText });
        }
      },
    },
  };
</script>

<style scoped>
  .checked {
    color: brown;
  }
</style>

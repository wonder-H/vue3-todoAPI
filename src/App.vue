<template>
  <div class="container">
    <CreateListItem />
    <ListsArea />
  </div>
</template>

<script>
  import CreateListItem from "./components/CreateListItem.vue";
  import ListsArea from "./components/ListsArea.vue";

  export default {
    components: {
      CreateListItem,
      ListsArea,
    },
  };
</script>

<style scoped>
  .container {
    background: linear-gradient(to bottom, #26a0da, #314755);
  }
</style>

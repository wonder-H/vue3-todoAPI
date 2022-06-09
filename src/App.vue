<template>
  <div class="container mx-auto my-10 text-center">
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

<style lang="scss">
body {
  background: #3b82a3;
  width: 100%;
  height: 100%;
}
</style>

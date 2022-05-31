<template>

  <ul>
    <ListItem v-for="list in lists" :key="list.id" :item="list" />
  </ul>
</template>

<script>

import ListItem from "./ListItem.vue";

export default{
  components: {
    ListItem
  },
computed: {
    lists() {
      return this.$store.state.lists
    }
  },
  created() {
    this.getListItem()
  },
  methods: {
    async getListItem(){
      this.$store.dispatch('fetchLists')
    }
  },
}
  </script>
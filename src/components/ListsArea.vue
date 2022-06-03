<template>
  <ul>
    <p v-if="listCount === 0 ? true : false" class="nothing">nothing...!!</p>
    <div v-else>
      <ListItem v-for="list in lists" :key="list.id" :item="list" />
    </div>
    {{
      listCount
    }}
    {{
      activeCount
    }}
    {{
      doneCount
    }}
    {{
      doneList
    }}
    {{
      activeList
    }}
  </ul>
</template>

<script>
  import ListItem from "./ListItem.vue";
  import { mapState, mapGetters } from "vuex";

  export default {
    components: {
      ListItem,
    },
    created() {
      this.getListItem();
    },
    computed: {
      ...mapState(["lists"]),
      ...mapGetters(["listCount", "doneList", "activeList", "activeCount", "doneCount"]),
    },
    methods: {
      async getListItem() {
        await this.$store.dispatch("fetchLists");
      },
    },
  };
</script>
<style>
  .done {
    text-decoration: line-through;
  }
  .nothing {
    color: red;
  }
</style>

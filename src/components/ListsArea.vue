<template>
  <p class="nothing" v-if="listCount < 1 ? true : false">You don't have any list... 😥</p>

  <ul ref="listbox">
    <ListItem class="boxli" v-for="list in lists" :key="list.id" :item="list" />
  </ul>
</template>
<script>
import ListItem from "./ListItem.vue";
import { mapState, mapGetters } from "vuex";
import Sortable from "sortablejs";

export default {
  components: {
    ListItem,
  },
  created() {
    this.getListItem();
  },
  mounted() {
    this.initSortable();
  },
  computed: {
    ...mapState(["lists"]),
    ...mapGetters(["listCount"]),
  },
  watch: {
    listCount(oldV, newV) {
      this.$store.dispatch("fetchLists");
    },
  },
  methods: {
    async getListItem() {
      try {
        (await this.$store.dispatch("fetchLists")) || [];
      } catch (error) {
        console.log(error);
      }
    },
    initSortable() {
      Sortable.create(this.$refs.listbox, {
        handle: "li .item",
        delay: 50, //50ms
        animation: false,
        forceFallback: true,
        sort: true,
        onEnd: (e) => {
          this.reorderListItem(e.oldIndex, e.newIndex);
        },
      });
    },
    async reorderListItem(oldIndex, newIndex) {
      try {
        if (oldIndex === newIndex) {
          return;
        } else {
          await this.$store.dispatch("reorderItem", {
            oldIndex,
            newIndex,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss">
.nothing {
  color: rgb(59, 60, 68);
  font-size: 30px;
  font-weight: 800;
}
</style>

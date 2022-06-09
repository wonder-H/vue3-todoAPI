<template>
  <li>
    <div @click.stop class="item" :class="{ checked: item.isDone }">
      <template v-if="!isEditMode">
        <p class="text-neutral-600 m-5 font-light text-sm">
          {{ item.editDate }}
        </p>
        <hr />
        <h2
          @click="this.$store.commit('changeActive', item), this.$store.dispatch('editItem', item)"
        >
          {{ item.text }}
        </h2>
        <button
          @click="toggleMode(), editItem(item)"
          class="text-green-600 hover:text-green-900 m-5"
        >
          Edit
        </button>
        <button @click="deleteItem(item)" class="text-red-400 hover:text-red-700 m-5">
          Delete
        </button>
      </template>
      <template v-else>
        <div class="edit">
          <input
            type="text"
            v-model="editText"
            @keydown.esc="toggleMode"
            ref="editInput"
            @keydown.enter="toggleMode(), editData($event.target.value, item)"
            class="m-auto block"
          />
          <button
            @click="toggleMode(), editData(this.$refs.editInput.value, item)"
            class="text-green-600 hover:text-green-900 mx-5"
          >
            Apply
          </button>
          <button @click="toggleMode" class="text-red-400 hover:text-red-700 m-5">Cancel</button>
        </div>
      </template>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: {},
    },
  },
  data() {
    return { isEditMode: false, editText: "" };
  },
  methods: {
    toggleMode() {
      this.isEditMode = !this.isEditMode;
      this.editText = "";
    },
    async editItem(item) {
      try {
        this.editText = item.text;
        await this.$nextTick();
        this.$refs.editInput.focus();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (confirm) {
          await this.$store.dispatch("deleteItem", item);
          await this.$store.dispatch("fetchLists");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editData(editText, item) {
      try {
        const text = editText.trim();
        if (!text || text === item.text) {
          this.isEditMode = false;
        } else {
          await this.$store.dispatch("editItem", { editText, ...item });
          await this.$store.dispatch("fetchLists");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
li {
  .item {
    width: 80%;
    background: #fff;
    margin: 30px auto;
    border-radius: 5px;
    padding-top: 5px;
    cursor: pointer;
    box-shadow: 10px 10px 20px #4c4c4c, -5px -5px 20px #383838;
    transition: 0.3s all ease-in-out;

    &:hover {
      background-color: rgb(203, 213, 225);
    }
    &.checked {
      color: rgb(139, 92, 246);
      text-decoration: line-through;
      background-color: rgba(220, 252, 231, 0.9);
    }
  }
  h2 {
    font-size: 25px;
    margin: 20px 50px;
    font-weight: 700;
    word-break: break-all;
  }
  .edit {
    min-height: 150px;
    input {
      height: 50px;
      width: 80%;
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>

import { createStore } from "vuex";
import _axios from "../api";

export default createStore({
  state() {
    return {
      lists: [],
    };
  },
  getters: {
    listCount(state, getters) {
      return state.lists.length;
    },
  },
  mutations: {
    setState(state, { ...payload }) {
      Object.keys(payload).forEach((i) => {
        state.lists[i] = payload[i];
      });
    },
    changeActive(state, item) {
      const checkedItem = state.lists.find((i) => i.id === item.id);
      checkedItem.isDone = !checkedItem.isDone;
    },
    changeOrder(state, { oldIndex, newIndex }) {
      const cloneLists = { ...state.lists[oldIndex] };
      state.lists.splice(oldIndex, 1);
      state.lists.splice(newIndex, 0, cloneLists);
    },
  },
  actions: {
    async deleteItem({ dispatch }, item) {
      await _axios.delete(`/${item.id}`);
    },
    async editItem({ dispatch }, newItem) {
      if (newItem.editText) {
        await _axios.put(`/${newItem.id}`, {
          title: newItem.editText,
          done: newItem.isDone,
          order: newItem.order,
        });
      } else {
        await _axios.put(`/${newItem.id}`, {
          title: newItem.text,
          done: newItem.isDone,
          order: newItem.order,
        });
      }
    },
    async fetchLists({ commit }) {
      //api format : { id, order, title, done, createdAt , updatedAt }
      //date format : ISO 8601
      const { data } = await _axios.get();
      const res = data.map((i) => ({
        id: i.id,
        order: i.order,
        text: i.title,
        isDone: i.done,
        createdDate: new Date(Date.parse(i.createdAt)).toLocaleString(),
        editDate: new Date(Date.parse(i.updatedAt)).toLocaleString(),
      }));

      commit("setState", res);
    },
    async createListItem({ state, dispatch }, text) {
      await _axios.post("/", { title: text, order: state.lists.length + 1 });
    },
    async reorderItem({ commit, state }, { oldIndex, newIndex }) {
      commit("changeOrder", { oldIndex, newIndex });
      const todoIds = state.lists.map((i) => i.id);
      await _axios.put("/reorder", { todoIds });
    },
  },
});

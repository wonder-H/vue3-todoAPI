import { createStore } from "vuex";
import _axios from "../api";

export default createStore({
  state() {
    return {
      lists: [],
    };
  },
  getters: {
    activeList(state) {
      return state.lists.filter((i) => !i.isDone);
    },
    doneList(state) {
      return state.lists.filter((i) => i.isDone);
    },
    doneCount(state, getters) {
      return getters.doneList.length;
    },
    activeCount(state, getters) {
      return getters.activeList.length;
    },
    listCount(state, getters) {
      return getters.activeList.length + getters.doneList.length;
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
  },
  actions: {
    async deleteItem({ dispatch }, item) {
      await _axios.delete(`/${item.id}`);
      dispatch("fetchLists");
    },
    async editItem({ dispatch }, newItem) {
      await _axios.put(`/${newItem.id}`, { title: newItem.editText, done: newItem.isDone, order: newItem.order });
      dispatch("fetchLists");
    },
    async fetchLists({ commit }) {
      //api { id, order, title, done, createdAt , updatedAt }
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
      dispatch("fetchLists");
    },
  },
});

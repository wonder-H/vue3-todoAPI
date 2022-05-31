import { createStore } from "vuex";
import _axios from "../api"

export default createStore({
  state() {
    return {
      lists: [],
    }
  },
  mutations: {
    setState(state, { ...payload }) {
      console.log('pay', payload)
      Object.keys(payload).forEach(i => {
        state.lists[i] = payload[i]
      })
      console.log(this.state.lists)
    },
  },
  actions: {
    async fetchLists({ commit }) {
      //api { id, order, title, done, createdAt, updatedAt }
      //date format : ISO 8601 
      const { data } = await _axios.get()
      console.log(data)

      const res = data.map(i => ({
        id: i.id,
        order: i.order,
        text: i.title,
        isDone: i.done,
        createdDate: new Date(Date.parse(i.createdAt)).toLocaleString(),
        editDate: new Date(Date.parse(i.updatedAt)).toLocaleString(),
      }))
      console.log('resss', res)

      commit('setState', res)
    },
    async createListItem(context, text) {

      console.log(text)
      const { data } = await _axios.post('/', { title: text })

      console.log('cre', data)

    }
  }
})
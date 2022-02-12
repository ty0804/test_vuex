import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表
    list: [],
    // 文本框内容
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    handleInputChange(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ""
    },
    removeItem(state, id) {
      // 根据id查找到对应索引项
      const i = state.list.findIndex(x => x.id === id)
      // 删除该索引项
      if (i !== -1)
        state.list.splice(i, 1)
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1)
        state.list[i].done = param.status
    },
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewKey(state, key) {
      console.log(11);
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit("initList", data)
      })
    }
  },
  getters: {
    // 统计未完成任务条数
    unDoneLength(state) {
      return state.list.filter(item => item.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      else { return state.list }


    }
  },
  modules: {
  }
})

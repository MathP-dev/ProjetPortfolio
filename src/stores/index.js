import { createStore } from 'vuex';

const store = createStore({
  state: {
    count: 0,
    todos: [],
    projects: [] // Ajout de projects à l'état
  },
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    ADD_TODO(state, todo) {
      state.todos.push(todo)
    },
    ADD_PROJECT(state, project) { // Ajout de la mutation ADD_PROJECT
      state.projects.push(project)
    },
  },
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    },
    addTodo({ commit }, todo) {
      commit('ADD_TODO', todo)
    },
    addProject({ commit }, project) { // Ajout de l'action addProject
      commit('ADD_PROJECT', project)
    }
  },
  getters: {
    doubleCount: state => {
      return state.count * 2
    },
    todoCount: state => {
      return state.todos.length
    },
    allProjects: state => { // Ajout du getter allProjects
      return state.projects
    }
  }
});

export default store;

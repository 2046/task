import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import tag from './modules/tag'
import todo from './modules/todo'
import { toPlainObject } from 'utils'
import SearchEngine from 'utils/searchEngine'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        query: {}
    },
    getters: {
        todos({ todo, tag, query }) {
            let tags, todos, result

            tags = tag.tags
            todos = todo.todos

            if (query.type && query.value) {
                result = new SearchEngine(query.type, query.value, { todos, tags })

                todos = result.length ? result : todos
            }
            
            return todos.map((item) => {
                return {
                    ...item,
                    tag : tags.filter((tag) => tag.id === item.tagId)[0]
                }
            })
        }
    },
    mutations: {
        searchTodos(state, query) {
            state.query = query
        }
    },
    actions: {
        init({ commit }) {
            return Promise.all([
                store.getTags(),
                store.getTodos()
            ]).then(([tags, todos]) => {                
                commit('initTag', toPlainObject(tags))
                commit('initTodo', toPlainObject(todos))
            })
        }
    },
    modules: {
        tag,
        todo
    }
})
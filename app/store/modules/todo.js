import store from '../store'
import { uuid } from 'utils'

export default {
    state: {
        todos: [],
        editing: false
    },
    mutations: {
        initTodo(state, todos) {
            state.todos = todos
        },
        addTodo(state, todo) {
            state.todos = [todo, ...state.todos]
        },
        updateTodo(state, todo) {
            state.todos.splice(state.todos.findIndex((item) => item.id === todo.id), 1, todo)
        },
        deleteTodo(state, todo) {
            state.todos.splice(state.todos.findIndex((item) => item.id === todo.id), 1)
        },
        updateTodoEditing(state, status) {
            state.editing = status
        }
    },
    actions: {
        addTodo({ commit }, todo) {
            todo = {
                ...todo,
                id: uuid(),
                completed: false
            }

            return store.addTodo(todo).then(() => commit('addTodo', todo))
        },
        editTodo({ commit }, todo) {
            return store.updateTodo(todo).then(() => commit('updateTodo', todo))
        },
        deleteTodo({ commit }, todo) {
            return store.deleteTodo(todo).then(() => commit('deleteTodo', todo))
        },
        toggleTodo({ commit }, todo) {
            todo.completed = !todo.completed

            return store.updateTodo(todo).then(() => commit('updateTodo', todo))
        }
    }
}
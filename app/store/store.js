import low from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
import { dbFilePath } from '../../conf/constants'

let defaultValue = {
    todos: [],
    tags: [{
        id: 'kvv28apvf',
        text: 'SPORT',
        color: '#8f13fd'
    }, {
        id: 'ql9ramppf',
        text: 'WORK',
        color: '#fe3585'
    }, {
        id: '3wproo5wn',
        text: 'TRAVEL',
        color: '#4fe3c1'
    }, {
        id: 'xi6jph4r9',
        text: 'FAMILY',
        color: '#b9e986'
    }]
}

const db = low(new FileAsync(dbFilePath, { defaultValue }))

export default {
    getTodos() {
        return db.then((_) => _.get('todos').value())
    },
    addTodo(todo) {
        return db.then((_) => _.get('todos').unshift(todo).write())
    },
    updateTodo(todo) {
        return db.then((_) => _.get('todos').find({ id: todo.id }).assign(todo).write())
    },
    deleteTodo(todo) {
        return db.then((_) => _.get('todos').remove({ id: todo.id }).write())
    },
    getTags() {
        return db.then((_) => _.get('tags').value())
    },
    addTag(tag) {
        return db.then((_) => _.get('tags').unshift(tag).write())
    },
    deleteTag(tagId) {
        return db.then((_) => _.get('tags').remove({ id: tagId }).write())
    }
}
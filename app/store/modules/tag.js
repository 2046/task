import store from '../store'
import { uuid } from 'utils'

export default {
    state: {
        tags: [],
        editing: false
    },
    mutations: {
        initTag(state, tags) {
            state.tags = tags
        },
        addTag(state, tag) {
            state.tags = [tag, ...state.tags]
        },
        deleteTag(state, tagId) {
            state.tags.splice(state.tags.findIndex((item) => item.id === tagId), 1)
        },
        updateTagEditing(state, status) {
            state.editing = status
        }
    },
    actions: {
        addTag({ commit }, { text, color }) {
            let tag = {
                text,
                color,
                id: uuid()
            }

            return store.addTag(tag).then(() => commit('addTag', tag))
        },
        deleteTag({ commit }, tagId) {
            return store.deleteTag(tagId).then(() => commit('deleteTag', tagId))
        }
    }
}
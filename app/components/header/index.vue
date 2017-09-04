<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { mapMutations } from 'vuex'
    import { ipcRenderer } from 'electron'

    export default {
        methods: {
            ...mapMutations(['updateTodoEditing', 'updateTagEditing']),
            bindMenuEvent() {
                ipcRenderer.on('new_todo', (event, message) => {
                    this.updateTagEditing(false)
                    this.updateTodoEditing(true)
                })
            }
        },
        mounted() {
            this.bindMenuEvent()
        }
    }
</script>
<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        computed: mapGetters(['todos']),
        methods: {
            ...mapMutations(['updateTodoEditing']),
            ...mapActions(['deleteTodo', 'toggleTodo']),
            edit(todo) {
                this.updateTodoEditing(true)
                this.$nextTick(() => this.$eventHub.emit('edit', todo))
            }
        }
    }
</script>
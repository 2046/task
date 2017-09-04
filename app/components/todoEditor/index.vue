<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { toPlainObject } from 'utils'
    import { mapState, mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            let now = date()

            return {
                todo: {
                    time: now,
                    tagId: '',
                    content: '',
                    timestamp: new Date(now).getTime()
                },
                minTime: now,
                newTodo: true,
                showTags: false
            }
        },
        computed: mapState({
            tags: (state) => state.tag.tags
        }),
        methods: {
            ...mapMutations(['updateTodoEditing']),
            ...mapActions(['addTodo', 'editTodo']),
            done() {
                this.updateTodoEditing(false)

                if (!this.todo.content.trim()) {
                    return
                }
                
                if (this.newTodo) {
                    setTimeout(this.addTodo, 100, this.todo)
                } else {
                    this.newTodo = true
                    setTimeout(this.editTodo, 100, this.todo)
                }
            },
            editHandle(todo) {
                this.newTodo = false
                this.todo = toPlainObject(todo)
            },
            toggleTags() {
                this.showTags = !this.showTags
            },
            enterHandle(e) {
                if (e.keyCode === 13) {
                    e.preventDefault()
                    this.hideTagsHandle()
                    this.done()
                }
            },
            hideTagsHandle() {
                this.showTags = false
            }
        },
        watch: {
            'todo.time': function(val) {
                this.todo.timestamp = new Date(val).getTime()
            }
        },
        mounted() {
            this.$eventHub.on('edit', this.editHandle)
            document.addEventListener('keypress', this.enterHandle)
            document.addEventListener('click', this.hideTagsHandle)
        },
        beforeDestroy() {
            this.$eventHub.off('edit', this.editHandle)
            document.removeEventListener('keypress', this.enterHandle)
            document.removeEventListener('click', this.hideTagsHandle)
        }
    }

    function date() {
        return new Date().toISOString().split('T')[0]
    }
</script>
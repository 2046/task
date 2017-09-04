<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { mapState } from 'vuex'
    import Todos from 'components/todos'
    import Search from 'components/search'
    import Headers from 'components/header'
    import Footers from 'components/footer'
    import TagEditor from 'components/tagEditor'
    import TodoEditor from 'components/todoEditor'

    export default {
        computed: mapState({
            tagEditing: (state) => state.tag.editing,
            todoEditing: (state) => state.todo.editing
        }),
        components: {
            Todos,
            Search,
            Headers,
            Footers,
            TagEditor,
            TodoEditor
        }
    }
</script>
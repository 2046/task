<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        data() {
            return {
                value: ''
            }
        },
        methods: {
            ...mapMutations(['searchTodos']),
            search() {
                let value, query

                if (!(value = this.value.trim())) {
                    return this.searchTodos({ type: '', value: '' })
                }

                value = value.toLowerCase()

                if (~value.indexOf('tag:')) {
                    query = { type: 'tag', value: convert('tag', value) }
                } else if (~value.indexOf('time:')) {
                    query = { type: 'time', value: convert('time', value) }
                } else {
                    query = { type: 'content', value }
                }

                this.searchTodos(query)
            },
            onSearch() {
                this.$eventHub.on('search', (value) => {
                    this.value = value
                    this.search()
                })
            }
        },
        mounted() {
            this.onSearch()
        },
        watch: {
            value(val) {
                this.search()
            }
        }
    }

    function convert(type, value) {
        if (type === 'tag') {
            return value.replace('tag:', '')
        } else if (type === 'time') {
            return value.replace('time:', '').split('~').map((item) => new Date(item).getTime())
        }
    }
</script>
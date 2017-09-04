<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { mapActions, mapMutations } from 'vuex'
    
    export default {
        data() {
            return {
                tag: {
                    text: '',
                    color: '#3498db'
                }
            }
        },
        methods: {
            ...mapActions(['addTag']),
            ...mapMutations(['updateTagEditing']),
            done() {
                this.updateTagEditing(false)

                if (!this.tag.text.trim()) {
                    return
                }
                
                setTimeout(this.addTag, 100, this.tag)
            },
            enterHandle(e) {
                if (e.keyCode === 13) {
                    e.preventDefault()
                    this.done()
                }
            }
        },
        mounted() {
            document.addEventListener('keypress', this.enterHandle)
        },
        beforeDestroy() {            
            document.removeEventListener('keypress', this.enterHandle)
        }
    }
</script>
<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    import { ipcRenderer } from 'electron'
    import Velocity from 'velocity-animate'
    import { mapState, mapMutations, mapActions } from 'vuex'

    export default {
        data() {
            return {
                vo: {
                    coord: { x: 0, y: 28 },
                    size: { width: 0, height: 0 }
                }
            }
        },
        computed: mapState({
            tags: (state) => state.tag.tags
        }),
        methods: {
            ...mapActions(['deleteTag']),
            ...mapMutations(['updateTagEditing', 'updateTodoEditing']),
            animation(el, done) {
                let width, element, translateX

                width = getSize().width
                element = this.$refs.addIcon
                translateX = width - this.vo.size.width
                translateX = translateX > 0 ? `+=${translateX}` : `-=${-translateX}`
                
                if (width > 510) {
                    let diff = 530 - this.vo.size.width
                    translateX = diff <= 0 ? `+=0` : `+=${530 - this.vo.size.width}`
                }
                
                Velocity(element, { translateX }, {
                    easing: 'ease',
                    duration: 600,
                    complete: () => {
                        if (translateX.includes('+=')) {
                            this.vo.size.width = this.vo.size.width + toInt(translateX)
                        } else {
                            this.vo.size.width = this.vo.size.width - toInt(translateX)
                        }

                        done()
                    }
                })
            },
            selectTag(tag) {
                this.$eventHub.emit('search', `tag:${tag.text}`)
            },
            init() {
                let { width } = this.vo.size = getSize()
                
                this.vo.coord.x = width + 38 > 510 ? 558 : width + 38
            },
            bindMenuEvent() {
                ipcRenderer.on('new_tag', (event, message) => {
                    this.updateTagEditing(true)
                    this.updateTodoEditing(false)
                })
            }
        },
        mounted() {
            this.bindMenuEvent()
            this.$nextTick(this.init)
        }
    }

    function toInt(str) {
        return str.match(/\d/g).join('') * 1
    }

    function getSize() {
        let element = document.querySelector('.tag__list')

        return {
            width: Math.floor(element.offsetWidth),
            height: Math.floor(element.offsetHeight)
        }
    }
</script>
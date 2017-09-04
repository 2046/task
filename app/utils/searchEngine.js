export default class SearchEngine {
    constructor(type, value, { todos, tags }) {
        return this[type](todos, tags, value)
    }
    content(todos, tags, value) {
        return todos.filter((item) => ~item.content.toLowerCase().indexOf(value))
    }
    tag(todos, tags, value) {
        let tag = tags.filter((item) => ~item.text.toLowerCase().indexOf(value))[0]
        
        return tag ? todos.filter((item) => item.tagId === tag.id) : []
    }
    time(todos, tags, [startTime, endTime]) {
        if (!endTime) {
            endTime = startTime
        }
    
        if (endTime < startTime) {
            [startTime, endTime] = [endTime, startTime]
        }
    
        return todos.filter((item) => (startTime <= item.timestamp && item.timestamp <= endTime))
    }
}
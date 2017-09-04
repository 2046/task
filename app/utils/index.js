export function toPlainObject(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export function uuid() {
    return Math.random().toString(36).substr(2, 9)
}
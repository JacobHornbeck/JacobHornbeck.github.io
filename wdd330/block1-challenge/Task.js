export default class Task {
    constructor(id, content, completed=false) {
        this.id = id
        this.content = content
        this.completed = completed
    }
}
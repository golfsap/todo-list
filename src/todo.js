export default class Todo {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.complete = false;
    }

    addDescription(description) {
        this.description = description;
    }

    addDueDate(date) {
        this.dueDate = date;
    }

    addPriority(level) {
        this.priority = level;
    }
}

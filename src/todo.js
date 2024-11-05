export default function Todo(name) {
    const id = Date.now().toString();
    let complete = false;
    let description = '';
    let priority = '';
    let dueDate = '';

    return {
        id,
        name: name, 
        complete,
        description,
        priority,
        dueDate
    }

}

// export default class Todo {
//     constructor(name) {
//         this.id = Date.now().toString();
//         this.name = name;
//         this.complete = false;
//     }

//     addDescription(description) {
//         this.description = description;
//     }

//     addDueDate(date) {
//         this.dueDate = date;
//     }

//     addPriority(level) {
//         this.priority = level;
//     }

//     toggleComplete() {
//         this.complete = this.complete === false ? true : false;
//     }
// }

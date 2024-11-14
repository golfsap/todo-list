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


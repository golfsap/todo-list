import Todo from "./todo";

export default function TodoApp() {
    const lists = [{
        id: Date.now().toString(),
        name: "My first list",
        tasks: []
    }];

    let selectedList = lists[0];
    let selectedTodo = null;

    // for debugging
    const getLists = () => lists;
    
    function createList(name) {
        return { id: Date.now().toString(), name: name, tasks: [] };
    }
    
    function addTodo(name) {
        const newTodo = new Todo(name);
        selectedList.tasks.push(newTodo);
    }
    
    function addNewList(name) {
        const newList = createList(name);
        lists.push(newList);
    }

    const switchSelectedList = (listId) => {
        selectedList = lists.find(list => list.id === listId);
    }

    // const switchSelectedTodo = (todoId) => {
    //     selectedTodo = selectedList.tasks.find(todo => todo.id === todoId);
    // }

    // const deselectTodo = () => {
    //     if (selectedTodo == null) return;
    //     selectedTodo = null;
    // }

    const toggleTodoComplete = (todoId) => {
        const todo = getTodo(todoId);
        todo.toggleComplete();
    }

    const addDescriptiontoTodo = (todoId, notes) => {
        const todo = getTodo(todoId);
        todo.addDescription(notes);
        console.log(todo.description);
    }

    const setPrioritytoTodo = (todoId, priority) => {
        const todo = getTodo(todoId);
        todo.addPriority(priority);
        console.log(todo.priority);
    }

    const setDueDatetoTodo = (todoId, date) => {
        const todo = getTodo(todoId);
        todo.addDueDate(date);
        console.log(todo.dueDate);
    }

    const getTodo = (todoId) => {
        // finds todo from selected list and returns
        return selectedList.tasks.find(todo => todo.id === todoId);
    }

    const getSelectedList = () => selectedList;

    // const getSelectedTodo = () => selectedTodo;


    return {
        getLists,
        createList,
        addTodo,
        addNewList,
        switchSelectedList,
        getSelectedList,
        toggleTodoComplete,
        addDescriptiontoTodo,
        setPrioritytoTodo,
        setDueDatetoTodo
    };
}




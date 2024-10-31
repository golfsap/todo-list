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

    const switchSelectedTodo = (todoId) => {
        selectedTodo = selectedList.tasks.find(todo => todo.id === todoId);
    }

    const deselectTodo = () => {
        if (selectedTodo == null) return;
        selectedTodo = null;
    }

    const toggleTodoComplete = (todoId) => {
        const todo = selectedList.tasks.find(todo => todo.id === todoId);
        todo.toggleComplete();
    }

    const getSelectedList = () => selectedList;

    const getSelectedTodo = () => selectedTodo;


    return {
        getLists,
        createList,
        addTodo,
        addNewList,
        switchSelectedList,
        switchSelectedTodo,
        deselectTodo,
        getSelectedList,
        getSelectedTodo,
        toggleTodoComplete
    };
}




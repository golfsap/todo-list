import Todo from "./todo";

export default function TodoApp() {

    const LOCAL_STORAGE_LIST_KEY = 'task.lists';

    const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || 
    [{
        id: Date.now().toString(),
        name: "My first list",
        tasks: []
    }];

    let selectedList = lists[0];

    const getLists = () => lists;

    // const setLists = () => {
    //     lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || 
    //     [{
    //         id: Date.now().toString(),
    //         name: "My first list",
    //         tasks: []
    //     }];
    // }
    
    function createList(name) {
        return { id: Date.now().toString(), name: name, tasks: [] };
    }
    
    function addTodo(name) {
        // returns the new todo id
        const newTodo = new Todo(name);
        selectedList.tasks.push(newTodo);
        return newTodo.id;
    }
    
    function addNewList(name) {
        // returns new list id
        const newList = createList(name);
        lists.push(newList);
        return newList.id;
    }

    function getList(id) {
        // returns list from id
        return lists.find(list => list.id === id);
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

    const save = () => {
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    }

    // const getSelectedTodo = () => selectedTodo;

    // setLists();

    return {
        getLists,
        createList,
        addTodo,
        addNewList,
        getList,
        getTodo,
        switchSelectedList,
        getSelectedList,
        toggleTodoComplete,
        addDescriptiontoTodo,
        setPrioritytoTodo,
        setDueDatetoTodo,
        save
    };
}




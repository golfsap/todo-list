import Todo from "./todo";

export default function TodoApp() {

    const LOCAL_STORAGE_LIST_KEY = 'task.lists';

    const initializeLists = () => {
        let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY));

        if (!lists || lists.length === 0) {
            return [{
                id: Date.now().toString(),
                name: "My first list",
                tasks: []
            }];
        }
        else {
            return lists;
        }
    }

    const lists = initializeLists();

    let selectedList = lists[0];

    const getLists = () => lists;
    
    function createList(name) {
        return { id: Date.now().toString(), name: name, tasks: [] };
    }
    
    function addTodo(name) {
        // returns the new todo id
        const newTodo = Todo(name);
        selectedList.tasks.push(newTodo);
        return newTodo.id;
    }

    function deleteTodo (todoId) {
        // delete todo from selected list
        const index = selectedList.tasks.findIndex(todo => todo.id === todoId);
        selectedList.tasks.splice(index, 1);
    }
    
    function addNewList(name) {
        // returns new list id
        const newList = createList(name);
        lists.push(newList);
        if (selectedList == null) {
            selectedList = lists[0];
        }
        return newList.id;
    }

    const deleteList = () => {
        // removes selectedList
        const index = lists.findIndex(list => list === selectedList);
        lists.splice(index, 1);
        // logic for if lists is empty
        if (lists.length > 0) {
            selectedList = lists[0];
        }
        else {
            selectedList = null;
        }
    }
 
    function getList(id) {
        // returns list from id
        return lists.find(list => list.id === id);
    }

    const switchSelectedList = (listId) => {
        selectedList = lists.find(list => list.id === listId);
    }

    const toggleTodoComplete = (todoId) => {
        const todo = getTodo(todoId);
        todo.complete = todo.complete === false ? true : false;
        // todo.toggleComplete();
    }

    const addDescriptiontoTodo = (todoId, notes) => {
        const todo = getTodo(todoId);
        todo.description = notes;
        // todo.addDescription(notes);
        console.log(todo.description);
    }

    const setPrioritytoTodo = (todoId, priority) => {
        const todo = getTodo(todoId);
        todo.priority = priority;
        // todo.addPriority(priority);
        console.log(todo.priority);
    }

    const setDueDatetoTodo = (todoId, date) => {
        const todo = getTodo(todoId);
        todo.dueDate = date;
        // todo.addDueDate(date);
        console.log(todo.dueDate);
    }

    const getTodo = (todoId) => {
        // finds todo from selected list and returns
        return selectedList.tasks.find(todo => todo.id === todoId);
    }

    const clearCompletedTodos = () => {
        selectedList.tasks.splice(0, selectedList.tasks.length, ...selectedList.tasks.filter(todo => todo.complete === false));
    }

    const getSelectedList = () => selectedList;

    const save = () => {
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
    }

    return {
        getLists,
        createList,
        addTodo,
        deleteTodo,
        addNewList,
        deleteList,
        getList,
        getTodo,
        switchSelectedList,
        getSelectedList,
        toggleTodoComplete,
        addDescriptiontoTodo,
        setPrioritytoTodo,
        setDueDatetoTodo,
        clearCompletedTodos,
        save
    };
}




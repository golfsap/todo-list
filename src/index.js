import "./style.css";
// import Todo from "./todo";
import TodoApp from "./lists";

const listContainer = document.getElementById("list-container");
const newListBtn = document.getElementById("new-list-btn");
const newListInput = document.getElementById("new-list-input");
const newTodoBtn = document.getElementById("new-todo-btn");
const newTodoInput = document.getElementById("new-todo-input");
const todoContainer = document.getElementById("todo-container");
const taskCount = document.getElementById("active-task-count");
const todoTemplate = document.getElementById("todo-template");

const todoApp = TodoApp();

// DOM
newListBtn.addEventListener("click", e => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName === "" || listName == null) return;
    todoApp.addNewList(listName);
    newListInput.value = null;
    console.log(todoApp.getLists());
    render();
})

newTodoBtn.addEventListener("click", e => {
    e.preventDefault();
    const todoName = newTodoInput.value;
    if (todoName === "" || todoName == null) return;
    todoApp.addTodo(todoName);
    newTodoInput.value = null;
    render();
})

listContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        todoApp.switchSelectedList(e.target.dataset.listId);
    }
    render();
})

todoContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const todoId = e.target.id;
        todoApp.toggleTodoComplete(todoId);
    }
    if (e.target.tagName.toLowerCase() === 'li') {
        const todoId = e.target.dataset.todoId;
        toggleTodoDetails(todoId);
    }
    render();
})

// function changeToSelectedList(listId) {
//     todoApp.selectedList = lists.find(list => list.id === listId);
// }


// Application Logic
// const lists = [{
//     id: Date.now().toString(),
//     name: "My first list",
//     tasks: []
// }];
// let selectedList = lists[0];
// let selectedTodo = null;

// function createList(name) {
//     // const id = Date.now().toString();
//     // const getId = () => id;

//     return { id: Date.now().toString(), name: name, tasks: [] };
// }

// function addTodo(name, list) {
//     const newTodo = new Todo(name);
//     list.tasks.push(newTodo);
// }

// function addNewList(name) {
//     const newList = createList(name);
//     lists.push(newList);
// }

function render() {
    clearElement(listContainer);
    renderLists();
    clearElement(todoContainer);
    renderTodos(todoApp.getSelectedList());
    renderTaskCount(todoApp.getSelectedList());
}

function renderLists() {
    const lists = todoApp.getLists();
    lists.forEach(list => {
        const listElement = document.createElement("li");
        listElement.textContent = list.name;
        listElement.dataset.listId = list.id;
        if (list.id === todoApp.getSelectedList().id) {
            listElement.classList.add("active-list");
        }
        listContainer.appendChild(listElement);
    })
}

function renderTodos(selectedList) {
    selectedList.tasks.forEach(todo => {
        const todoElement = document.importNode(todoTemplate.content, true);
        const todoListElement = todoElement.querySelector("li");
        todoListElement.dataset.todoId = todo.id;
        const checkbox = todoElement.querySelector("input");
        checkbox.id = todo.id;
        checkbox.checked = todo.complete;
        const label = todoElement.querySelector("label");
        label.htmlFor = todo.id;
        label.append(todo.name);
        if (todoApp.getSelectedTodo() != null && todo.id === todoApp.getSelectedTodo().id ) {
            const expandableWrapper = todoElement.querySelector(".expandable-wrapper");
            expandableWrapper.classList.add("is-open");
            // alert(todoApp.getSelectedTodo().name);
        }
        // const todoElement = document.createElement("li");
        // todoElement.textContent = todo.name;
        // todoElement.dataset.taskId = todo.id;
        // if (todo.id === selectedTodo.id) {
        //     todoElement.classList.add("is-open");
        // }
        todoContainer.appendChild(todoElement);
    })
}

function toggleTodoDetails(todoId) {
     if (todoApp.getSelectedTodo() == null) {
        todoApp.switchSelectedTodo(todoId);
     }
     else if (todoApp.getSelectedTodo().id === todoId) {
        todoApp.deselectTodo();
     }
     else {
        todoApp.switchSelectedTodo(todoId);
     }
}

function renderTaskCount(selectedList) {
    const remainingTasks = selectedList.tasks.filter(task => !task.complete === true).length;

    taskCount.textContent = `${remainingTasks} tasks remaining`;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function findTodoElement(todoId) {
    // returns li element 
    return document.querySelector(`[data-todo-id="${todoId}"]`);
}

// addNewList("My first list");
render();
console.log(todoApp.getLists());
// addTodo("Shower", lists[0]);
// console.log(lists[0].tasks);
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
    // for debugging
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
    console.log(e.target);
    if (e.target.classList.contains("checkbox")) {
        const todoId = e.target.id;
        todoApp.toggleTodoComplete(todoId);
        renderTaskCount(todoApp.getSelectedList());
    }
    else if (e.target.tagName.toLowerCase() === 'li') {
        const todoId = e.target.dataset.todoId;
        toggleTodoDetails(todoId);
    }
    // e.stopPropagation();
    // render();
})

todoContainer.addEventListener("change", e => {
    
    if (e.target.tagName.toLowerCase() === 'textarea') {
        const todoId = findTodoId(e);
        todoApp.addDescriptiontoTodo(todoId,e.target.value);
    }
    else if (e.target.tagName.toLowerCase() === 'select') {
        const todoId = findTodoId(e);
        todoApp.setPrioritytoTodo(todoId,e.target.value);
        console.log(e.target.value);
    }
    else if (e.target.classList.contains("date")) {
        const todoId = findTodoId(e);
        todoApp.setDueDatetoTodo(todoId,e.target.value);
        console.log(e.target.value);
    }
})

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
        const labels = todoElement.querySelectorAll("label");
        labels[0].htmlFor = todo.id;
        labels[0].append(todo.name);
        labels[1].htmlFor = `notes-${todo.id}`;
        labels[2].htmlFor = `priority-${todo.id}`;
        labels[3].htmlFor = `due-date-${todo.id}`;

        const textArea = todoElement.querySelector("textarea");
        textArea.disabled = false;
        textArea.id = `notes-${todo.id}`;

        const dropDown = todoElement.querySelector("select");
        dropDown.id = `priority-${todo.id}`;

        const dueDate = todoElement.querySelector("input[type=date]");
        dueDate.id = `due-date-${todo.id}`; 

        // if a todo is selected, show details
        // if (todoApp.getSelectedTodo() != null && todo.id === todoApp.getSelectedTodo().id ) {
        //     const expandableWrapper = todoElement.querySelector(".expandable-wrapper");
        //     expandableWrapper.classList.add("is-open");
        // }
        
        todoContainer.appendChild(todoElement);
    })
}

function toggleTodoDetails(todoId) {
    const todoElement = document.querySelector(`[data-todo-id="${todoId}"]`);
        const wrapper = todoElement.querySelector(".expandable-wrapper");
        wrapper.classList.toggle("is-open");
}

// function setTodoDetails() {
//     const todoDetailsElement = document.querySelector(".todo-details");
//     const labels = todoDetailsElement.querySelectorAll("label");
//     labels[0].htmlFor = `notes-${todoApp.getSelectedTodo().id}`;
    
//     labels[1].htmlFor = `priority-${todoApp.getSelectedTodo().id}`;

//     labels[2].htmlFor = `due-date-${todoApp.getSelectedTodo().id}`;
// }

function renderTaskCount(selectedList) {
    const remainingTasks = selectedList.tasks.filter(task => !task.complete === true).length;

    taskCount.textContent = `${remainingTasks} tasks remaining`;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function findTodoId(e) {
    // returns todo Id for form details event 
    return e.target.parentNode.parentNode.parentNode.parentNode.dataset.todoId;
}

// addNewList("My first list");
render();
console.log(todoApp.getLists());
// addTodo("Shower", lists[0]);
// console.log(lists[0].tasks);
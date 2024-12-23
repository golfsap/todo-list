import "./style.css";
import TodoApp from "./lists";

const listContainer = document.getElementById("list-container");
const newListBtn = document.getElementById("new-list-btn");
const newListInput = document.getElementById("new-list-input");
const newTodoBtn = document.getElementById("new-todo-btn");
const newTodoInput = document.getElementById("new-todo-input");
const mainTasksContainer = document.querySelector(".todo-list");
const todoContainer = document.getElementById("todo-container");
const listName = document.getElementById("list-name");
const taskCount = document.getElementById("active-task-count");
const todoTemplate = document.getElementById("todo-template");
const deleteSection = document.querySelector(".delete-stuff"); 
const clearTasksBtn = document.getElementById("clear-completed-tasks");
const deleteListBtn = document.getElementById("delete-list");

const todoApp = TodoApp();

// DOM
newListBtn.addEventListener("click", e => {
    e.preventDefault();
    handleNewList();
})

newTodoBtn.addEventListener("click", e => {
    e.preventDefault();
    const todoName = newTodoInput.value;
    if (todoName === "" || todoName == null) return;
    const todoId = todoApp.addTodo(todoName);
    newTodoInput.value = null;
    renderNewTodo(todoId);
    renderTaskCount(todoApp.getSelectedList());
    todoApp.save();
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
        console.log(todoId);
        todoApp.toggleTodoComplete(todoId);
        renderTaskCount(todoApp.getSelectedList());
        todoApp.save();
    }
    else if (e.target.classList.contains("todo-name")) {
        const todoId = e.target.querySelector('input').id;
        toggleTodoDetails(todoId);
    }
    else if (e.target.tagName.toLowerCase() === 'button') {
        const todoId = e.target.dataset.btnId;
        todoApp.deleteTodo(todoId);
        todoApp.save();
        render();
    }
})

todoContainer.addEventListener("change", e => {
    if (e.target.tagName.toLowerCase() === 'textarea') {
        const todoId = findTodoId(e);
        todoApp.addDescriptiontoTodo(todoId,e.target.value);
    }
    else if (e.target.tagName.toLowerCase() === 'select') {
        const todoId = findTodoId(e);
        todoApp.setPrioritytoTodo(todoId,e.target.value);
        renderTodoDetails(todoId);
    }
    else if (e.target.classList.contains("date")) {
        const todoId = findTodoId(e);
        todoApp.setDueDatetoTodo(todoId,e.target.value);
        renderTodoDetails(todoId);
    }
    todoApp.save();
})

deleteSection.addEventListener("click", (e) => {
    if (e.target.id === "clear-completed-tasks") {
        removeCompletedTasks();
    }
    else if (e.target.id === "delete-list") {
        handleDeleteList();
        render();
    }
    todoApp.save();
})

function render() {
    clearElement(listContainer);
    renderLists();
    clearElement(todoContainer);

    if (!todoApp.getSelectedList()) return;
    renderTodos(todoApp.getSelectedList());
    renderTaskCount(todoApp.getSelectedList());
    renderListName(todoApp.getSelectedList());
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

function renderNewList(listId) {
    const list = todoApp.getList(listId);
    const listElement = document.createElement("li");
    listElement.textContent = list.name;
    listElement.dataset.listId = list.id;
    listContainer.append(listElement);
}

function renderNewTodo(todoId) {
    const todo = todoApp.getTodo(todoId);
    const todoElement = document.importNode(todoTemplate.content, true);
    const todoListElement = todoElement.querySelector("li");
    todoListElement.dataset.todoId = todo.id;
    const checkbox = todoElement.querySelector("input");
    checkbox.id = todo.id;
    checkbox.checked = todo.complete;
    const deleteBtn = todoElement.querySelector(".delete-todo");
    deleteBtn.dataset.btnId = todo.id;
    const labels = todoElement.querySelectorAll("label");
    labels[0].htmlFor = todo.id;
    labels[0].append(todo.name);
    labels[1].htmlFor = `notes-${todo.id}`;
    labels[2].htmlFor = `priority-${todo.id}`;
    labels[3].htmlFor = `due-date-${todo.id}`;

    const textArea = todoElement.querySelector("textarea");
    textArea.id = `notes-${todo.id}`;

    const dropDown = todoElement.querySelector("select");
    dropDown.id = `priority-${todo.id}`;

    const dueDate = todoElement.querySelector("input[type=date]");
    dueDate.id = `due-date-${todo.id}`; 
    todoContainer.appendChild(todoElement);
}

function renderTodos(selectedList) {
    if (!selectedList) return;
    selectedList.tasks.forEach(todo => {
        const todoElement = document.importNode(todoTemplate.content, true);
        const todoListElement = todoElement.querySelector("li");
        todoListElement.dataset.todoId = todo.id;
        const checkbox = todoElement.querySelector("input");
        checkbox.id = todo.id;
        checkbox.checked = todo.complete;
        const deleteBtn = todoElement.querySelector(".delete-todo");
        deleteBtn.dataset.btnId = todo.id;
        const labels = todoElement.querySelectorAll("label");
        labels[0].htmlFor = todo.id;
        labels[0].append(todo.name);
        labels[1].htmlFor = `notes-${todo.id}`;
        labels[2].htmlFor = `priority-${todo.id}`;
        labels[3].htmlFor = `due-date-${todo.id}`;

        const textArea = todoElement.querySelector("textarea");
        if (todo.description !== undefined) {
            textArea.value = todo.description;
        }
        else textArea.value = '';
        textArea.id = `notes-${todo.id}`;

        const dropDown = todoElement.querySelector("select");
        dropDown.value = todo.priority;
        dropDown.id = `priority-${todo.id}`;
        const priority = todoListElement.querySelector(".priority");
        priority.textContent = todo.priority;
        addPriorityColors(priority, todo.priority);
        const dueDate = todoElement.querySelector("input[type=date]");
        dueDate.value = todo.dueDate;
        dueDate.id = `due-date-${todo.id}`; 
        const dateLabel = todoListElement.querySelector(".due-date");
        dateLabel.textContent = todo.dueDate;

        todoContainer.appendChild(todoElement);
    })
}

function renderTodoDetails(todoId) {
    const todo = todoApp.getTodo(todoId);
    const todoListElement = findTodoElement(todoId);
    const priority = todoListElement.querySelector(".priority");
    priority.textContent = todo.priority;
    addPriorityColors(priority, todo.priority);
    const dueDate = todoListElement.querySelector('.due-date');
    dueDate.textContent = todo.dueDate;
}

function toggleTodoDetails(todoId) {
    const todoElement = document.querySelector(`[data-todo-id="${todoId}"]`);
        const wrapper = todoElement.querySelector(".expandable-wrapper");
        wrapper.classList.toggle("is-open");
}

function renderTaskCount(selectedList) {
    const remainingTasks = selectedList.tasks.filter(task => !task.complete === true).length;

    taskCount.textContent = `${remainingTasks} tasks remaining`;
}

function renderListName(selectedList) {
    listName.textContent = selectedList.name;
}

function handleNewList() {
    const listName = newListInput.value;
    if (listName === "" || listName == null) return;
    const listId = todoApp.addNewList(listName);
    newListInput.value = null;
    todoApp.save();
    if (todoApp.getLists().length === 1) {
        // adding list from empty container
        mainTasksContainer.classList.remove("hidden");
        render();
    }
    else {
        renderNewList(listId);
    }
}

function handleDeleteList() {
    // deletes the currently selected list
    todoApp.deleteList();
    if (todoApp.getSelectedList() == null) {
        // lists is empty, hide tasks container
        mainTasksContainer.classList.add("hidden");
    }
}

function removeCompletedTasks() {
    todoApp.clearCompletedTodos();
    render();    
} 

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function findTodoElement(todoId) {
    return todoContainer.querySelector(`[data-todo-id='${todoId}']`);
}

function findTodoId(e) {
    // returns todo Id for form details event 
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.todoId;
}

function addPriorityColors(element, priority) {
    if (priority == null || priority === '') return;
    // remove existing class/classes
    element.classList.remove("urgent", "important", "low-priority", "done");
    switch (priority) {
        case "Urgent":
            element.classList.add("urgent");
            break;
        case "Important":
            element.classList.add("important");
            break;
        case "Low priority":
            element.classList.add("low-priority");
            break;
        case "Done":
            element.classList.add("done");
            break;
    }
}

// localStorage.clear();
render();
console.log(todoApp.getLists());

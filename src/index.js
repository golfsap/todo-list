import "./style.css";
import Todo from "./todo";

const listContainer = document.getElementById("list-container");

const lists = [];

function createList(name) {
    let id;
    // const name = name;
    const tasks = [];

    const getId = () => id;
    return { id, name };
}

// function addTodo() {

// }

function addNewList(name) {
    const newList = createList(name);
    lists.push(newList);
}

function render() {
    lists.forEach(list => {
        const listElement = document.createElement("li");
        listElement.textContent = list.name;
        listContainer.appendChild(listElement);
    })
}

addNewList("Work");
render();
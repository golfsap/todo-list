import Todo from "./todo";

const lists = [];

function createList(name) {
    let id;
    const name = name;
    const tasks = [];

    const getId = () => id;
    return { getId, name, tasks };
}




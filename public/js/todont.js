"use strict";

const id = _id => document.getElementById(_id);
let default_items = '';
let local_items = [];

document.querySelector("body").onload = main;


function main() {
    default_items = id('todo-list').innerHTML;

    document.getElementById('todo-form').onsubmit = (event) => {
        event.preventDefault();

        processFormSubmit(event);

        return false;
    }
}

function processFormSubmit(event) {
    const text = id('todo-item-text').value;
    id('todo-item-text').value = '';
    if (text !== '' && text !== 'clear') {
        let priority = id('todo-item-priority').value;
        console.log(`New item: ${text} ${priority}`);
        const data = {
            text: text,
            priority: priority
        };
        local_items.push(data);
        fetch('http://65.52.233.112/add_todont', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }).then((response) => {
            return response.json();
        }).then((res) => {
            console.log(res);
        }).catch ((err) => {
            console.log(err);
        });
        render();
    }
}

function render() {
    const template = id('todo-item-template');
    let list_elt = id('todo-list');
    list_elt.innerHTML = '';
    for (let i = 0; i < local_items.length; ++i) {
        let new_li = document.importNode(template.content, true);
        new_li.querySelector('.todo-item-text').textContent = local_items[i].text;
        new_li.querySelector('.todo-item-priority').textContent = local_items[i].priority;
        list_elt.appendChild(new_li);
    }
}

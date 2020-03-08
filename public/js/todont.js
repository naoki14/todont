"use strict";

const id = _id => document.getElementById(_id);
let default_items = '';
let local_items = [];

document.querySelector("body").onload = main;


function main() {
    default_items = id('todo-list').innerHTML;
    // get the items from the server as soon as the page loads
    getTodontItems();

    document.getElementById('todo-form').onsubmit = (event) => {
        // preventDefault() stops the browser's default behavior of
        // sending the form data and refreshing the page
        event.preventDefault();

        processFormSubmit(event);
        
        return false;
    }

    //hw
    document.getElementById('get-form').onsubmit = (event) => {
        // preventDefault() stops the browser's default behavior of
        // sending the form data and refreshing the page
        event.preventDefault();

        getFilteredItems(event);
        
        return false;
    }
}
//hw
function getFilteredItems () {
    fetch(`http://40.77.29.228/get_filtered_todont?priority=${id("filter").value}`, {
        method: 'GET'
    }).then( res => {
        return res.json();
    }).then( data => {
        // log the data
        console.log(data);
        // overwrite local_items with the array of todont items
        // recieved from the server
        local_items = data.filtered_items;
        // render the list of items received from the server
        render();
    }).catch( err => {
        console.log(err);
    });
}

async function processFormSubmit(event) {
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
        fetch('http://40.77.29.228/add_todont', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }).then( res => {
            // just log the status for now
            return console.log(res.status);
        }).catch( err=> {
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

function getTodontItems () {
    fetch('http://40.77.29.228/todont_items', {
        method: 'GET'
    }).then( res => {
        return res.json();
    }).then( data => {
        // log the data
        console.log(data);
        // overwrite local_items with the array of todont items
        // recieved from the server
        local_items = data.todont_items;
        // render the list of items received from the server
        render();
    }).catch( err => {
        console.log(err);
    });
}
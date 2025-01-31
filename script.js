// Load saved data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    loadReminders();
    loadNotes();
});

// Save To-Do Task
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todoList = document.getElementById('todo-list');

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = todoText;

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            todoList.removeChild(li);
            saveTodos(); // Save updated list after deletion
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);

        // Clear input field
        todoInput.value = '';

        // Save to localStorage
        saveTodos();
    }
}

// Save Reminders
function addReminder() {
    const reminderInput = document.getElementById('reminder-input');
    const reminderText = reminderInput.value.trim();

    if (reminderText !== "") {
        const reminderList = document.getElementById('reminder-list');

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = reminderText;

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            reminderList.removeChild(li);
            saveReminders(); // Save updated list after deletion
        };

        li.appendChild(deleteButton);
        reminderList.appendChild(li);

        // Clear input field
        reminderInput.value = '';

        // Save to localStorage
        saveReminders();
    }
}

// Save Notes
function saveNotes() {
    const notesInput = document.getElementById('notes-input');
    const savedNotes = document.getElementById('saved-notes');
    savedNotes.textContent = notesInput.value;

    // Save notes to localStorage
    localStorage.setItem('notes', notesInput.value);
}

// Save To-Do List to localStorage
function saveTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = [];
    todoList.querySelectorAll('li').forEach(item => {
        todos.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Save Reminders to localStorage
function saveReminders() {
    const reminderList = document.getElementById('reminder-list');
    const reminders = [];
    reminderList.querySelectorAll('li').forEach(item => {
        reminders.push(item.textContent.replace('Delete', '').trim());
    });
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Load To-Do List from localStorage
function loadTodos() {
    const todoList = document.getElementById('todo-list');
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    savedTodos.forEach(todoText => {
        const li = document.createElement('li');
        li.textContent = todoText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            todoList.removeChild(li);
            saveTodos();
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Load Reminders from localStorage
function loadReminders() {
    const reminderList = document.getElementById('reminder-list');
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];

    savedReminders.forEach(reminderText => {
        const li = document.createElement('li');
        li.textContent = reminderText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            reminderList.removeChild(li);
            saveReminders();
        };

        li.appendChild(deleteButton);
        reminderList.appendChild(li);
    });
}

// Load Notes from localStorage
function loadNotes() {
    const notesInput = document.getElementById('notes-input');
    const savedNotes = localStorage.getItem('notes') || '';
    notesInput.value = savedNotes;
    document.getElementById('saved-notes').textContent = savedNotes;
}
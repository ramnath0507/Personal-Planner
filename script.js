// Load saved tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Add Task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const dueDateInput = document.getElementById('due-date');

    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (taskText !== "") {
        const taskList = document.getElementById('task-list');

        // Create a new list item
        const li = document.createElement('li');

        // Add task details
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const prioritySpan = document.createElement('span');
        prioritySpan.className = 'priority';
        prioritySpan.textContent = `[${priority.toUpperCase()}]`;

        const dueDateSpan = document.createElement('span');
        dueDateSpan.className = 'due-date';
        dueDateSpan.textContent = dueDate ? `Due: ${dueDate}` : '';

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Save updated list after deletion
        };

        // Append elements to the list item
        li.appendChild(prioritySpan);
        li.appendChild(taskSpan);
        li.appendChild(dueDateSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        // Clear input fields
        taskInput.value = '';
        dueDateInput.value = '';

        // Save tasks to localStorage
        saveTasks();
    }
}

// Save Tasks to localStorage
function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(item => {
        const taskText = item.querySelector('span:not(.priority):not(.due-date)').textContent;
        const priority = item.querySelector('.priority').textContent.replace('[', '').replace(']', '');
        const dueDate = item.querySelector('.due-date').textContent.replace('Due: ', '');

        tasks.push({
            text: taskText,
            priority: priority.toLowerCase(),
            dueDate: dueDate || null
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from localStorage
function loadTasks() {
    const taskList = document.getElementById('task-list');
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    savedTasks.forEach(task => {
        const li = document.createElement('li');

        const prioritySpan = document.createElement('span');
        prioritySpan.className = 'priority';
        prioritySpan.textContent = `[${task.priority.toUpperCase()}]`;

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        const dueDateSpan = document.createElement('span');
        dueDateSpan.className = 'due-date';
        dueDateSpan.textContent = task.dueDate ? `Due: ${task.dueDate}` : '';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(prioritySpan);
        li.appendChild(taskSpan);
        li.appendChild(dueDateSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}
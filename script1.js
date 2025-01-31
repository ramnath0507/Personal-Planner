function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
    taskList.appendChild(listItem);

    taskInput.value = '';

    // Save tasks to local storage
    saveTasks();
}

function removeTask(button) {
    const listItem = button.parentElement;
    listItem.remove();

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(li => li.textContent.replace('Delete', '').trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    tasks.forEach(taskText => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(listItem);
    });
}

// Load tasks on page load
window.onload = loadTasks;

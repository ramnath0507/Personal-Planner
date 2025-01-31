// Load saved tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('kanban.html')) {
        loadKanbanTasks();
    } else if (window.location.pathname.includes('grid.html')) {
        loadGridTasks();
    }
});

// Add Task (Kanban or Grid)
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        if (window.location.pathname.includes('kanban.html')) {
            const statusSelect = document.getElementById('status-select');
            const status = statusSelect.value;

            const columnId = `${status}-column`;
            const column = document.getElementById(columnId);

            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                column.removeChild(li);
                saveKanbanTasks();
            };

            li.appendChild(deleteButton);
            column.appendChild(li);

            saveKanbanTasks();
        } else if (window.location.pathname.includes('grid.html')) {
            const taskGrid = document.getElementById('task-grid');

            const taskDiv = document.createElement('div');
            taskDiv.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                taskGrid.removeChild(taskDiv);
                saveGridTasks();
            };

            taskDiv.appendChild(deleteButton);
            taskGrid.appendChild(taskDiv);

            saveGridTasks();
        }

        taskInput.value = '';
    }
}

// Save Kanban Tasks to localStorage
function saveKanbanTasks() {
    const columns = ['todo', 'in-progress', 'done'];
    const tasks = {};

    columns.forEach(column => {
        const columnElement = document.getElementById(`${column}-column`);
        tasks[column] = [];

        columnElement.querySelectorAll('li').forEach(item => {
            tasks[column].push(item.textContent.replace('Delete', '').trim());
        });
    });

    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// Load Kanban Tasks from localStorage
function loadKanbanTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('kanbanTasks')) || { todo: [], 'in-progress': [], done: [] };

    Object.keys(savedTasks).forEach(column => {
        const columnElement = document.getElementById(`${column}-column`);

        savedTasks[column].forEach(taskText => {
            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                columnElement.removeChild(li);
                saveKanbanTasks();
            };

            li.appendChild(deleteButton);
            columnElement.appendChild(li);
        });
    });
}

// Save Grid Tasks to localStorage
function saveGridTasks() {
    const taskGrid = document.getElementById('task-grid');
    const tasks = [];

    taskGrid.querySelectorAll('div').forEach(taskDiv => {
        tasks.push(taskDiv.textContent.replace('Delete', '').trim());
    });

    localStorage.setItem('gridTasks', JSON.stringify(tasks));
}

// Load Grid Tasks from localStorage
function loadGridTasks() {
    const taskGrid = document.getElementById('task-grid');
    const savedTasks = JSON.parse(localStorage.getItem('gridTasks')) || [];

    savedTasks.forEach(taskText => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            taskGrid.removeChild(taskDiv);
            saveGridTasks();
        };

        taskDiv.appendChild(deleteButton);
        taskGrid.appendChild(taskDiv);
    });
}
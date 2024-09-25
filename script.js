document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

const addTaskBtn = document.getElementById('task-btn');
const taskInput = document.getElementById('add-text-task');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() === '') return;

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    taskItem.addEventListener('click', toggleComplete);
    taskItem.addEventListener('dblclick', removeTask);

    taskList.appendChild(taskItem);
    saveTasksToLocalStorage();

    taskInput.value = '';
}

function toggleComplete() {
    this.classList.toggle('completed');
    saveTasksToLocalStorage();
}

function removeTask() {
    this.remove();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.addEventListener('click', toggleComplete);
        taskItem.addEventListener('dblclick', removeTask);

        taskList.appendChild(taskItem);
    });
}

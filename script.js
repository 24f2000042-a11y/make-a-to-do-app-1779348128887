document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage if available
    const loadTasks = () => {
        const tasks = JSON.parse(.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            addTaskToDOM(taskText);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent);
        });
        .setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Event listener for adding tasks
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Allow adding tasks by pressing Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial load of tasks
    loadTasks();
});

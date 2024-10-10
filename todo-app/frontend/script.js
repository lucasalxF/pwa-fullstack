document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    const apiUrl = 'http://localhost:3000/tasks';

    // Fetch and display tasks
    const fetchTasks = async () => {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    };

    // Add new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newTask = { id: Date.now().toString(), name: taskInput.value };
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        taskInput.value = '';
        fetchTasks();
    });

    // Delete task
    const deleteTask = async (id) => {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchTasks();
    };

    fetchTasks();
});

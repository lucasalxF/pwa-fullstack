document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Função para carregar tarefas do localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
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

    // Função para salvar tarefas no localStorage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Adicionar nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = { id: Date.now().toString(), name: taskInput.value };
        tasks.push(newTask);
        saveTasks(tasks);
        taskInput.value = '';
        loadTasks();
    });

    // Deletar tarefa
    const deleteTask = (id) => {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(tasks);
        loadTasks();
    };

    // Carregar tarefas ao iniciar
    loadTasks();
});

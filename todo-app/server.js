const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const tasksFilePath = './data/tasks.json';

// Helper function to read tasks from file
const readTasks = () => {
    const data = fs.readFileSync(tasksFilePath);
    return JSON.parse(data);
};

// Helper function to write tasks to file
const writeTasks = (tasks) => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// CRUD Routes
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = req.body;
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = req.params.id;
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        writeTasks(tasks);
        res.json(updatedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskId = req.params.id;
    const newTasks = tasks.filter(task => task.id !== taskId);
    writeTasks(newTasks);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

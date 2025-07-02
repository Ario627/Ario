const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory store for tasks
let tasks = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Clean the house', completed: true },
];
let nextTaskId = 3; // To generate unique IDs for new tasks

app.get('/', (req, res) => {
    res.send('To-Do List API is running!');
});

// --- CRUD Operations for Tasks ---

// Create (POST /tasks)
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTask = {
        id: nextTaskId++,
        title,
        completed: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Read all (GET /tasks)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Read one (GET /tasks/:id)
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

// Update (PUT /tasks/:id)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const { title, completed } = req.body;
    if (title !== undefined) {
        tasks[taskIndex].title = title;
    }
    if (completed !== undefined) {
        tasks[taskIndex].completed = completed;
    }
    res.json(tasks[taskIndex]);
});

// Delete (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send(); // No content
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

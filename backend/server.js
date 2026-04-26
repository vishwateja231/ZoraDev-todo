const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── In-Memory Task Store ─────────────────────────────────────────────────────
let tasks = [];

// ─── Routes ───────────────────────────────────────────────────────────────────

/**
 * GET /tasks
 * Returns all tasks in the store.
 */
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/**
 * POST /tasks
 * Body: { text: string }
 * Creates a new task and adds it to the store.
 */
app.post('/tasks', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Task text is required.' });
  }

  const newTask = {
    id: Date.now(),
    text: text.trim(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * DELETE /tasks/:id
 * Removes the task matching the given id from the store.
 */
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  res.json({ message: 'Task deleted successfully.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Task Manager API running at http://localhost:${PORT}`);
});

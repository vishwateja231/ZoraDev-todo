import { useState, useEffect } from 'react';
import './App.css';

// ─── Backend Base URL ─────────────────────────────────────────────────────────
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const ChecklistIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="12" x2="15" y2="12" />
    <line x1="9" y1="15" x2="12" y2="15" />
  </svg>
);

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ─── Load all tasks on mount ────────────────────────────────────────────────
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running.');
    }
  };

  // ─── Add a new task ─────────────────────────────────────────────────────────
  const handleAddTask = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error || 'Failed to add task.');
        return;
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      setInputText('');
    } catch (err) {
      setError('Network error while adding task.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete a task ──────────────────────────────────────────────────────────
  const handleDeleteTask = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setError('Failed to delete task.');
        return;
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError('Network error while deleting task.');
    } finally {
      setDeletingId(null);
    }
  };

  // ─── Allow pressing Enter to add task ──────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask();
  };

  const isAddDisabled = loading || inputText.trim() === '';

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div className="card">

        {/* ── Header ── */}
        <header className="card-header">
          <div className="header-icon">
            <ChecklistIcon />
          </div>
          <div>
            <h1 className="title">My Tasks</h1>
            <p className="subtitle">Stay organised, one task at a time.</p>
          </div>
        </header>

        {/* ── Divider ── */}
        <div className="divider" />

        {/* ── Input Row ── */}
        <div className="input-row">
          <input
            id="task-input"
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              setError('');
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <button
            id="add-task-btn"
            className="add-btn"
            onClick={handleAddTask}
            disabled={isAddDisabled}
          >
            {loading ? (
              <span className="btn-spinner" />
            ) : (
              '+ Add'
            )}
          </button>
        </div>

        {/* ── Error Message ── */}
        {error && (
          <div className="error-banner" role="alert">
            <span className="error-dot" />
            {error}
          </div>
        )}

        {/* ── Task List ── */}
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <EmptyIcon />
            </div>
            <p className="empty-title">No tasks yet</p>
            <p className="empty-hint">Add your first task above to get started.</p>
          </div>
        ) : (
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li
                key={task.id}
                className={`task-item${deletingId === task.id ? ' task-item--deleting' : ''}`}
              >
                <span className="task-index">{index + 1}</span>
                <span className="task-text">{task.text}</span>
                <button
                  id={`delete-btn-${task.id}`}
                  className="delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label={`Delete task: ${task.text}`}
                  disabled={deletingId === task.id}
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* ── Footer ── */}
        <footer className="card-footer">
          <span className="task-count">
            {tasks.length === 0
              ? 'No tasks'
              : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`}
          </span>
        </footer>

      </div>
    </div>
  );
}

export default App;

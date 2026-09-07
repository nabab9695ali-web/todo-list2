import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsWidget from './components/StatsWidget';
import FilterBar from './components/FilterBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Toast from './components/Toast';
import { todoApi } from './services/api';

function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('taskflow_theme') || 'dark';
  });

  // Tasks and API State
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sync Theme with DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('taskflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Check Backend Connectivity
  useEffect(() => {
    const checkConnection = async () => {
      const isOnline = await todoApi.checkHealth();
      setIsBackendConnected(isOnline);
    };
    checkConnection();
    const interval = setInterval(checkConnection, 15000); // Check every 15s
    return () => clearInterval(interval);
  }, []);

  // Fetch Todos when filters change
  const loadTodos = async () => {
    try {
      const res = await todoApi.getTodos({
        status: statusFilter,
        category: categoryFilter,
        priority: priorityFilter,
        search: searchQuery
      });
      setTodos(res.data);
      if (!res.isLocal) {
        setIsBackendConnected(true);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [statusFilter, categoryFilter, priorityFilter, searchQuery]);

  // Create Task
  const handleAddTodo = async (todoData) => {
    try {
      const res = await todoApi.createTodo(todoData);
      showToast('Task added successfully! 🎯', 'success');
      loadTodos();
    } catch (error) {
      showToast('Failed to add task.', 'danger');
    }
  };

  // Edit / Update Task
  const handleUpdateTodo = async (id, updateData) => {
    try {
      await todoApi.updateTodo(id, updateData);
      setEditingTodo(null);
      showToast('Task updated successfully! ✨', 'info');
      loadTodos();
    } catch (error) {
      showToast('Failed to update task.', 'danger');
    }
  };

  // Toggle Complete
  const handleToggleComplete = async (todo) => {
    try {
      const newStatus = !todo.completed;
      await todoApi.updateTodo(todo._id, { completed: newStatus });
      if (newStatus) {
        showToast('Great job completing task! 🌟', 'success');
      }
      loadTodos();
    } catch (error) {
      showToast('Failed to toggle status.', 'danger');
    }
  };

  // Delete Task
  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      showToast('Task deleted.', 'danger');
      loadTodos();
    } catch (error) {
      showToast('Failed to delete task.', 'danger');
    }
  };

  // Clear Completed
  const handleClearCompleted = async () => {
    try {
      await todoApi.clearCompleted();
      showToast('Completed tasks cleared! 🧹', 'info');
      loadTodos();
    } catch (error) {
      showToast('Failed to clear completed tasks.', 'danger');
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        isBackendConnected={isBackendConnected}
      />

      {/* Overview Stats */}
      <StatsWidget todos={todos} />

      {/* Task Creation & Edit Form */}
      <TodoForm
        onAddTodo={handleAddTodo}
        onUpdateTodo={handleUpdateTodo}
        editingTodo={editingTodo}
        onCancelEdit={() => setEditingTodo(null)}
      />

      {/* Search & Filter Toolbar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {/* Tasks List */}
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onEdit={(todo) => {
          setEditingTodo(todo);
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }}
        onDelete={handleDeleteTodo}
        onClearCompleted={handleClearCompleted}
        totalItemsCount={todos.length}
      />

      {/* Toast Notification Container */}
      {toast && (
        <div className="toast-container">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      {/* Footer for Portfolio */}
      <footer className="app-footer">
        <div>
          Designed & Built with ❤️ by <strong>Adil Raza</strong>
        </div>
        <div className="tech-badges">
          <span className="tech-tag">MongoDB</span>
          <span className="tech-tag">Express.js</span>
          <span className="tech-tag">React.js</span>
          <span className="tech-tag">Node.js</span>
          <span className="tech-tag">REST API</span>
          <span className="tech-tag">Vite</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

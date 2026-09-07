import axios from 'axios';

// Base URL configured for both local development and Render/Netlify production
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 6000 // 6 seconds timeout
});

// Helper for local storage fallback in case backend is waking up or offline
const LOCAL_STORAGE_KEY = 'taskflow_portfolio_tasks';

const getLocalTasks = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      // Default initial tasks to showcase fresher portfolio
      const initialTasks = [
        {
          _id: 'demo-1',
          title: 'Deploy backend on Render',
          description: 'Connect GitHub repository and configure MongoDB Atlas environment variables.',
          completed: false,
          priority: 'high',
          category: 'Work',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          _id: 'demo-2',
          title: 'Publish frontend on Netlify',
          description: 'Link the client folder, set VITE_API_URL and test the live application.',
          completed: false,
          priority: 'medium',
          category: 'Work',
          dueDate: new Date(Date.now() + 172800000).toISOString(),
          createdAt: new Date().toISOString()
        },
        {
          _id: 'demo-3',
          title: 'Review React State Management & Hooks',
          description: 'Practice useState, useEffect, and clean component architecture for portfolio presentation.',
          completed: true,
          priority: 'low',
          category: 'Study',
          dueDate: null,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialTasks));
      return initialTasks;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

const saveLocalTasks = (tasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const todoApi = {
  // Fetch Todos
  getTodos: async (params = {}) => {
    try {
      const response = await apiClient.get('/todos', { params });
      return { success: true, data: response.data.data, isLocal: false };
    } catch (error) {
      console.warn('Backend offline or not reachable. Using local storage mode for seamless preview:', error.message);
      let list = getLocalTasks();
      // Filter locally
      if (params.status === 'active') list = list.filter(t => !t.completed);
      if (params.status === 'completed') list = list.filter(t => t.completed);
      if (params.category && params.category !== 'All') list = list.filter(t => t.category === params.category);
      if (params.priority && params.priority !== 'All') list = list.filter(t => t.priority === params.priority);
      if (params.search && params.search.trim()) {
        const q = params.search.toLowerCase();
        list = list.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
      }
      return { success: true, data: list, isLocal: true };
    }
  },

  // Create Todo
  createTodo: async (todoData) => {
    try {
      const response = await apiClient.post('/todos', todoData);
      return { success: true, data: response.data.data, isLocal: false };
    } catch (error) {
      const list = getLocalTasks();
      const newTask = {
        _id: 'local-' + Date.now(),
        ...todoData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      list.unshift(newTask);
      saveLocalTasks(list);
      return { success: true, data: newTask, isLocal: true };
    }
  },

  // Update Todo
  updateTodo: async (id, updates) => {
    try {
      const response = await apiClient.put(`/todos/${id}`, updates);
      return { success: true, data: response.data.data, isLocal: false };
    } catch (error) {
      const list = getLocalTasks();
      const idx = list.findIndex(t => t._id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
        saveLocalTasks(list);
        return { success: true, data: list[idx], isLocal: true };
      }
      throw new Error('Task not found in local cache');
    }
  },

  // Delete Todo
  deleteTodo: async (id) => {
    try {
      const response = await apiClient.delete(`/todos/${id}`);
      return { success: true, data: response.data, isLocal: false };
    } catch (error) {
      let list = getLocalTasks();
      list = list.filter(t => t._id !== id);
      saveLocalTasks(list);
      return { success: true, data: {}, isLocal: true };
    }
  },

  // Clear Completed
  clearCompleted: async () => {
    try {
      const response = await apiClient.delete('/todos/completed/clear');
      return { success: true, data: response.data, isLocal: false };
    } catch (error) {
      let list = getLocalTasks();
      const activeOnly = list.filter(t => !t.completed);
      saveLocalTasks(activeOnly);
      return { success: true, deletedCount: list.length - activeOnly.length, isLocal: true };
    }
  },

  // Check Backend Health
  checkHealth: async () => {
    try {
      const res = await apiClient.get('/health', { timeout: 3000 });
      return res.status === 200;
    } catch {
      return false;
    }
  }
};

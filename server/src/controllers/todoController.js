const Todo = require('../models/Todo');

// @desc    Get all todos with optional filters
// @route   GET /api/todos
const getTodos = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;

    const filter = {};

    // Status filter
    if (status === 'completed') {
      filter.completed = true;
    } else if (status === 'active') {
      filter.completed = false;
    }

    // Category filter
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Priority filter
    if (priority && priority !== 'All') {
      filter.priority = priority;
    }

    // Search filter
    if (search && search.trim() !== '') {
      filter.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to fetch todos',
      error: error.message
    });
  }
};

// @desc    Get todo statistics
// @route   GET /api/todos/stats
const getStats = async (req, res) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        total,
        completed,
        active,
        completionRate
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to calculate stats',
      error: error.message
    });
  }
};

// @desc    Create new todo
// @route   POST /api/todos
const createTodo = async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task title is required'
      });
    }

    const newTodo = await Todo.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      category: category || 'General',
      dueDate: dueDate || null
    });

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Task created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid task data',
      error: error.message
    });
  }
};

// @desc    Update existing todo
// @route   PUT /api/todos/:id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: 'Task updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
};

// @desc    Delete all completed todos
// @route   DELETE /api/todos/completed/clear
const clearCompleted = async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });

    res.status(200).json({
      success: true,
      message: `Cleared ${result.deletedCount} completed tasks`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear completed tasks',
      error: error.message
    });
  }
};

module.exports = {
  getTodos,
  getStats,
  createTodo,
  updateTodo,
  deleteTodo,
  clearCompleted
};

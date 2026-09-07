const express = require('express');
const router = express.Router();
const {
  getTodos,
  getStats,
  createTodo,
  updateTodo,
  deleteTodo,
  clearCompleted
} = require('../controllers/todoController');

// Specific routes first
router.get('/stats', getStats);
router.delete('/completed/clear', clearCompleted);

// Collection routes
router.route('/')
  .get(getTodos)
  .post(createTodo);

// Item routes
router.route('/:id')
  .put(updateTodo)
  .delete(deleteTodo);

module.exports = router;

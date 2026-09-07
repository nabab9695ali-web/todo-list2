import React from 'react';
import { Check, Trash2, Edit3, Calendar, Tag, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const TodoItem = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const handleToggle = () => {
    if (!todo.completed) {
      // Confetti celebratory burst when marking task complete
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#ec4899', '#10b981', '#f59e0b']
      });
    }
    onToggleComplete(todo);
  };

  // Check if due date is overdue
  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    const due = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div
      className={`task-card priority-${todo.priority || 'medium'} ${
        todo.completed ? 'completed-card' : ''
      }`}
    >
      {/* Checkbox */}
      <div className="task-checkbox-wrapper">
        <button
          onClick={handleToggle}
          className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
          aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {todo.completed && <Check size={14} strokeWidth={3} />}
        </button>
      </div>

      {/* Task Info */}
      <div className="task-details">
        <h3 className={`task-title ${todo.completed ? 'completed-text' : ''}`}>
          {todo.title}
        </h3>

        {todo.description && (
          <p className={`task-description ${todo.completed ? 'completed-text' : ''}`}>
            {todo.description}
          </p>
        )}

        <div className="task-meta-tags">
          {/* Priority Badge */}
          <span className={`badge badge-${todo.priority || 'medium'}`}>
            {todo.priority ? todo.priority.toUpperCase() : 'MEDIUM'}
          </span>

          {/* Category Badge */}
          <span className="badge badge-category">
            <Tag size={12} />
            {todo.category || 'General'}
          </span>

          {/* Due Date */}
          {todo.dueDate && (
            <span className={`badge badge-date ${isOverdue() ? 'overdue' : ''}`}>
              {isOverdue() ? <AlertCircle size={12} /> : <Calendar size={12} />}
              {isOverdue() ? 'Overdue: ' : 'Due: '}
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="task-actions">
        <button
          onClick={() => onEdit(todo)}
          className="action-btn edit-btn"
          title="Edit Task"
        >
          <Edit3 size={17} />
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="action-btn delete-btn"
          title="Delete Task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

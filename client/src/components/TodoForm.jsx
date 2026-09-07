import React, { useState, useEffect } from 'react';
import { PlusCircle, Check, X, Sparkles } from 'lucide-react';

const TodoForm = ({ onAddTodo, onUpdateTodo, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setPriority(editingTodo.priority || 'medium');
      setCategory(editingTodo.category || 'General');
      setDueDate(editingTodo.dueDate ? editingTodo.dueDate.split('T')[0] : '');
      setIsExpanded(true);
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('General');
    setDueDate('');
    setIsExpanded(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskPayload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    };

    if (editingTodo) {
      onUpdateTodo(editingTodo._id, taskPayload);
    } else {
      onAddTodo(taskPayload);
      resetForm();
    }
  };

  return (
    <div className="task-form-card">
      <div className="form-header">
        <h2>
          {editingTodo ? (
            <>
              <Check size={20} color="var(--primary)" />
              <span>Edit Task</span>
            </>
          ) : (
            <>
              <PlusCircle size={20} color="var(--primary)" />
              <span>Add New Task</span>
            </>
          )}
        </h2>

        {editingTodo && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="action-btn"
            title="Cancel Editing"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Main Title Input */}
        <div className="task-input-group">
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done? (e.g., Complete MERN project documentation)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            required
            maxLength={120}
          />
        </div>

        {/* Detailed inputs (shown when focused or editing) */}
        {isExpanded && (
          <>
            <div className="task-input-group">
              <textarea
                className="task-textarea"
                placeholder="Add optional notes, links, or description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                maxLength={500}
              />
            </div>

            <div className="form-meta-row">
              <div className="meta-field">
                <label className="meta-label">Priority</label>
                <select
                  className="meta-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              <div className="meta-field">
                <label className="meta-label">Category</label>
                <select
                  className="meta-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">📁 General</option>
                  <option value="Work">💼 Work</option>
                  <option value="Personal">👤 Personal</option>
                  <option value="Study">📚 Study</option>
                  <option value="Health">🏃 Health</option>
                </select>
              </div>

              <div className="meta-field">
                <label className="meta-label">Due Date</label>
                <input
                  type="date"
                  className="meta-date-input"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        <div className="form-actions">
          {isExpanded && !editingTodo && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsExpanded(false)}
            >
              Collapse
            </button>
          )}

          {editingTodo && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="btn btn-primary">
            {editingTodo ? (
              <>
                <Check size={18} /> Update Task
              </>
            ) : (
              <>
                <PlusCircle size={18} /> Add Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardList, Sparkles } from 'lucide-react';

const TodoList = ({
  todos,
  onToggleComplete,
  onEdit,
  onDelete,
  onClearCompleted,
  totalItemsCount
}) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <ClipboardList size={32} />
        </div>
        <h3 className="empty-state-title">No tasks found</h3>
        <p className="empty-state-subtitle">
          {totalItemsCount === 0
            ? 'Add your first task above to get organized and stay productive!'
            : 'Try adjusting your search or filters to see more tasks.'}
        </p>
      </div>
    );
  }

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div>
      <div className="tasks-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <div className="list-footer">
        <span className="items-left-count">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>

        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="clear-btn"
            title="Remove all completed tasks"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoList;

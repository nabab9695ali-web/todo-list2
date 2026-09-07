import React from 'react';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

const StatsWidget = ({ todos }) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getEncouragement = () => {
    if (total === 0) return 'No tasks yet. Create one to get started!';
    if (percentage === 100) return '🎉 Amazing work! All tasks are completed!';
    if (percentage >= 50) return '🚀 More than halfway there! Keep it up!';
    return '🌱 Take it one step at a time!';
  };

  return (
    <div>
      {/* 3 Metric Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <ListTodo size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-number">{total}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-number">{pending}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed">
            <CheckCircle2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <span className="stat-number">{completed}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-banner">
        <div className="progress-header">
          <span className="progress-title">{getEncouragement()}</span>
          <span className="progress-percent">{percentage}% Done</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;

import React from 'react';
import { Search, X, Filter } from 'lucide-react';

const FilterBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter
}) => {
  return (
    <div className="filter-toolbar">
      {/* Search Bar */}
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search your tasks by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="action-btn"
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Row: Status Tabs & Dropdowns */}
      <div className="filter-row">
        {/* Status Tabs */}
        <div className="status-tabs">
          {['all', 'active', 'completed'].map((status) => (
            <button
              key={status}
              className={`status-tab-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="dropdown-filters">
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">📁 All Categories</option>
            <option value="General">General</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Health">Health</option>
          </select>

          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">⚡ All Priorities</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

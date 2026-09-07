import React from 'react';
import { CheckSquare, Moon, Sun, Database, Sparkles } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, isBackendConnected }) => {
  return (
    <nav className="navbar">
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <CheckSquare size={24} />
        </div>
        <div>
          <div className="brand-title">
            TaskFlow
            <span className="brand-badge">MERN</span>
          </div>
        </div>
      </div>

      <div className="nav-actions">
        <div 
          className="portfolio-tag" 
          title={isBackendConnected ? 'Connected to MongoDB & Express Backend' : 'Running in Local Portfolio Mode'}
        >
          <span className="status-dot" style={{ backgroundColor: isBackendConnected ? '#10b981' : '#f59e0b' }} />
          <span>{isBackendConnected ? 'Backend Online' : 'Local Demo Mode'}</span>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

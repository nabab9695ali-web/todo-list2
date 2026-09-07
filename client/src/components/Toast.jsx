import React, { useEffect } from 'react';
import { CheckCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle size={18} color="var(--danger)" />;
      case 'info':
        return <Info size={18} color="var(--primary)" />;
      case 'success':
      default:
        return <CheckCircle size={18} color="var(--success)" />;
    }
  };

  return (
    <div className={`toast ${type}`}>
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

export default Toast;

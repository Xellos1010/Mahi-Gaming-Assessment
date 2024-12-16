import React from 'react';
import styles from './ToastContainer.module.scss';
import Toast from './Toast';
import { useToast } from '../../../context/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.toastContainer}>
      {toasts.length > 0 ? (
        toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            id={toast.id}
            type={toast.type} 
            message={toast.message} 
            onRemove={removeToast} 
          />
        ))
      ) : (
        <div className={styles.noNotifications}>No notifications</div>
      )}
    </div>
  );
};

export default ToastContainer;

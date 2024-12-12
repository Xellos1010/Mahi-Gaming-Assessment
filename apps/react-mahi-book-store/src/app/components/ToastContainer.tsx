import React from 'react';
import styles from './ToastContainer.module.scss';
import { useToast } from '@frontend/context/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.toastContainer}>
      {toasts.length > 0 ? (
        toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
            <div className={styles.toastContent}> {/* New wrapper div for flex alignment */}
              <span>{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)} 
                className="text-white hover:opacity-75"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      ) : (
        <div>No notifications</div>
      )}
    </div>
  );
};

export default ToastContainer;

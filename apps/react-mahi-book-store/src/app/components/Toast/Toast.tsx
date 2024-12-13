import React, { useEffect } from 'react';
import styles from './Toast.module.scss';

type ToastProps = {
    id: number;
    type: string;
    message: string;
    onRemove: (id: number) => void;
};

const Toast: React.FC<ToastProps> = ({ id, type, message, onRemove }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(id);
        }, 2000); // Auto-close after 2 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [id, onRemove]);
    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <div className={styles.toastContent}>
                <span>{message}</span>
                <button
                    onClick={() => onRemove(id)}
                    className="text-white hover:opacity-75"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;

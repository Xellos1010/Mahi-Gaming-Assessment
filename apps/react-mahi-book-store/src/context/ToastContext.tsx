import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([{ id: 1, message: "Test toast", type: "info" }]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((currentToasts) => [...currentToasts, { id, message, type }]);

    // Automatically remove toast after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((currentToasts) => 
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type: ToastType) => {
    const baseStyles = 'px-4 py-2 rounded-md text-white shadow-lg mb-2';
    switch (type) {
      case 'success': return `${baseStyles} bg-green-500`;
      case 'error': return `${baseStyles} bg-red-500`;
      case 'warning': return `${baseStyles} bg-yellow-500`;
      default: return `${baseStyles} bg-blue-500`;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-72">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={getToastStyles(toast.type)}
        >
          <div className="flex justify-between items-center">
            <span>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)} 
              className="ml-2 text-white hover:opacity-75"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
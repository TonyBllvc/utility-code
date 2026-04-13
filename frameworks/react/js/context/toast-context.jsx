// toast-context.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { limitHandler } from '../../utils/helper/textManager';


// reference the hook '@../utils/toaster'

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [queue, setQueue] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setQueue((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (queue.length > 0 && toasts.length === 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      setToasts([next]);
      setTimeout(() => removeToast(next.id), next.duration || 3000);
    }
  }, [queue, toasts]);
  // const [toasts, setToasts] = useState([]);

  // const addToast = (toast) => {
  //   const id = Date.now();
  //   setToasts((prev) => [...prev, { ...toast, id }]);
  //   setTimeout(() => removeToast(id), toast?.duration || 3000);
  // };

  // const removeToast = (id) => {
  //   setToasts((prev) => prev.filter((t) => t.id !== id));
  // };

  const toastStyle = () => {
    const baseStyle = toasts.map((toast) => {
      const statusStyles = toast?.status === 'success' ? 'bg-green-600' :
        toast?.status === 'error' ? 'bg-red-500' :
          toast?.status === 'warning' ? 'bg-yellow-600' :
            ['pending', 'info'].includes(toast?.status) ? 'bg-blue-500' :
              'bg-blue-500'
      return statusStyles;
    });

    const basePosition = toasts.map((toast) => {
      const position = toast?.position === 'top-left' ? 'top-4 left-5' :
        toast?.position === 'top-right' ? 'top-4 right-5' :
          toast?.position === 'bottom-left' ? 'bottom-4 left-5' :
            toast?.position === 'bottom-right' ? 'bottom-4 right-5' :
              'top-4 right-5'
      return position;
    });

    const baseCloseable = toasts.map((toast) => {
      const closeable = toast?.isClosable === false ? false : true;
      return closeable;
    });

    return { baseStyle, basePosition, baseCloseable };
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className={`fixed ${toastStyle().basePosition} z-[9999] flex flex-col gap-2`}>
          <style>
            {`
              @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
              }
            `}
          </style>
          {toasts.map((toast) => (
            <div
              key={toast?.id}
              className={`p-4 rounded-md shadow-md text-white flex items-start justify-between min-w-[250px] max-w-[260px] sm:max-w-[550px] animate-fade-in
                ${toastStyle().baseStyle} relative
                `}
            >
              <div className='mt-3.5 overflow-hidden'>
                <h4 className=" text-base sm:text-lg font-bold break-words">{toast?.title}</h4>
                {toast?.description && <p className='text-sm sm:text-base break-words text-white/90'>{toast?.description}</p>}
              </div>
              <button onClick={() => removeToast(toast?.id)} className={` ${toastStyle().baseCloseable ? "block" : "hidden"} ml-4 mb-10 text-xl absolute top-1.5 right-2`}>
                &times;
              </button>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                <div
                  className="h-full bg-white"
                  style={{ animation: `progress ${toast.duration || 3000}ms linear forwards` }}
                ></div>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  // const ctx = useContext(ToastContext);
  // if (!ctx) throw new Error("useToast must be used inside <ToastProvider/>");
  // return ctx.addToast;
  const { addToast } = useContext(ToastContext);
  return addToast;
};

// reference the hook '@../utils/toaster'
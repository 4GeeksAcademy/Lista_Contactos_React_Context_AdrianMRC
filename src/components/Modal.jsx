import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const Modal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  showFooter = true
}) => {
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose?.();
    if (show) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; 
    };
  }, [show, onClose]);

  if (!show) return null;

  return ReactDOM.createPortal(
    <div 
      className="modal-backdrop fade show"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
    <div className="modal-dialog-container w-100 h-100 d-flex align-items-center justify-content-center">
      <div 
        className="modal-content bg-white p-4 rounded-3"
        onClick={e => e.stopPropagation()}
      >
        {title && <h3 className="mb-3">{title}</h3>}
        <div className="modal-body">
          {children}
        </div>
        
        {showFooter && (
          <div className="modal-footer d-flex justify-content-end gap-2 mt-4">
            <button 
              className="btn btn-outline-secondary" 
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  </div>,
  document.body
);
}
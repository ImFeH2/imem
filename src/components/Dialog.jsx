import React, {useEffect, useRef} from 'react';

export const Dialog = ({children, open, onClose}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (open) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black/50"
                onClick={onClose}
            />
            <div
                ref={dialogRef}
                className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10"
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div>
    );
};

export const DialogTrigger = ({children, onClick}) => {
    return React.cloneElement(children, {onClick});
};

export const DialogContent = ({children, className = ''}) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};

export const DialogHeader = ({children}) => {
    return (
        <div className="mb-4">
            {children}
        </div>
    );
};

export const DialogTitle = ({children}) => {
    return (
        <h2 className="text-lg font-semibold">
            {children}
        </h2>
    );
};

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {X} from "lucide-react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(({className, ...props}, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={`
      fixed inset-0 z-50 bg-black/30 dark:bg-black/50
      backdrop-blur-sm data-[state=open]:animate-fade-in
      ${className}`}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({className, children, ...props}, ref) => (
    <DialogPortal>
        <DialogOverlay/>
        <DialogPrimitive.Content
            ref={ref}
            className={`
        fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]
        w-full max-w-lg max-h-[90vh] overflow-y-auto
        bg-white dark:bg-slate-900
        rounded-lg shadow-lg
        border border-gray-200 dark:border-slate-700
        data-[state=open]:animate-fade-in
        ${className}`}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 hover:opacity-100">
                <X className="h-4 w-4"/>
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
                          className,
                          ...props
                      }) => (
    <div
        className={`
      flex flex-col space-y-1.5 p-6
      border-b border-gray-200 dark:border-slate-700
      ${className}`}
        {...props}
    />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
                          className,
                          ...props
                      }) => (
    <div
        className={`
      flex justify-end space-x-2 p-6
      bg-gray-50 dark:bg-slate-800/50
      border-t border-gray-200 dark:border-slate-700
      ${className}`}
        {...props}
    />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(({className, ...props}, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={`text-lg font-semibold leading-none ${className}`}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(({className, ...props}, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={`text-sm text-gray-500 dark:text-slate-400 ${className}`}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};

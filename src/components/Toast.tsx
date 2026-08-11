import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl p-3.5 shadow-lg border text-xs font-semibold backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-700 dark:bg-emerald-950 dark:border-emerald-800'
              : toast.type === 'warning'
              ? 'bg-amber-900/90 text-white border-amber-700 dark:bg-amber-950 dark:border-amber-800'
              : 'bg-slate-900/90 text-white border-slate-700 dark:bg-slate-950 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />}
            {toast.type === 'warning' && <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />}
            {toast.type === 'info' && <Info className="h-4 w-4 shrink-0 text-indigo-400" />}
            <span className="leading-snug">{toast.message}</span>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="rounded-lg p-1 text-slate-300 hover:bg-white/20 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

import { useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../stores/uiStore';
import type { Toast as ToastType } from '../../stores/uiStore';

const Toast = ({ toast }: { toast: ToastType }) => {
  const { removeToast } = useUIStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  const icons: Record<ToastType['type'], React.ReactElement> = {
    success: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    error: <XCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertCircle className="h-5 w-5 text-orange-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  };

  const colors: Record<ToastType['type'], string> = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-orange-50 border-orange-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const titleColors: Record<ToastType['type'], string> = {
    success: 'text-green-900',
    error: 'text-red-900',
    warning: 'text-orange-900',
    info: 'text-blue-900',
  };

  const messageColors: Record<ToastType['type'], string> = {
    success: 'text-green-700',
    error: 'text-red-700',
    warning: 'text-orange-700',
    info: 'text-blue-700',
  };

  return (
    <div
      className={`${colors[toast.type]} border-2 rounded-xl p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-top-5 fade-in max-w-md w-full`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0">{icons[toast.type]}</div>
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className={`font-semibold ${titleColors[toast.type]} mb-1`}>
              {toast.title}
            </p>
          )}
          <p className={`text-sm ${messageColors[toast.type]}`}>
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </div>
  );
};

export default Toast;

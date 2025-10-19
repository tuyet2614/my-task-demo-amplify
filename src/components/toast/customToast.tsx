import { toast } from "sonner";

export const customToast = {
  success: (message?: string, options = {}) => {
    toast.success(message, {
      ...options,
      className: "whitespace-pre-line",
    });
  },
  error: (message: string, options = {}) => {
    toast.error(message, {
      ...options,
      className: "whitespace-pre-line",
    });
  },
  warning: (message: string, options = {}) => {
    toast.warning(message, {
      ...options,
      className: "whitespace-pre-line",
    });
  },
};

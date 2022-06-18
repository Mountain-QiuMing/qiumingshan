import { createStandaloneToast, UseToastOptions } from '@chakra-ui/toast';

const { toast: $toast } = createStandaloneToast({
  defaultOptions: {
    position: 'top',
    containerStyle: {
      margin: '30px',
    },
  },
});

const toastStauts: UseToastOptions['status'][] = ['info', 'error', 'loading', 'success', 'warning'];

function toastFn(message: string, options?: UseToastOptions) {
  const toastOption = options ? { ...options, description: message } : { description: message };
  return $toast(toastOption);
}

type ToastInstance = typeof toastFn & {
  info: typeof toastFn;
  error: typeof toastFn;
  loading: typeof toastFn;
  success: typeof toastFn;
  warning: typeof toastFn;
};

const toast = toastFn as ToastInstance;

toastStauts.forEach(status => {
  toast[status] = (message: string, options?: UseToastOptions) => {
    return toastFn(message, {
      ...options,
      status,
    });
  };
});

export { toast };

import axios from 'axios';

import { useErrorStore } from '@/lib/store/errorStore';

function getMutationErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    return message || error.message || 'Something went wrong';
  }

  return 'Something went wrong';
}

export default function useMutationError() {
  const { clearError, setError } = useErrorStore();

  return {
    clearError,
    onError: (error: unknown) => {
      setError(getMutationErrorMessage(error));
    },
  };
}

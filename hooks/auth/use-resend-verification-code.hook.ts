import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/api';
import z from 'zod';
import { schemas } from '@/lib/api/openapi';
import useMutationError from '@/hooks/useMutationError';

type ResendData = z.infer<typeof schemas.ResendDTO>;

const resend = (data: ResendData) => client.resend_verification(data);

export default function useResendVerificationCode() {
  const { clearError, onError } = useMutationError();

  return useMutation({
    mutationFn: resend,
    onMutate: clearError,
    onError,
  });
}

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import z from 'zod';
import { schemas } from '@/lib/api/openapi';

type ResendData = z.infer<typeof schemas.ResendDTO>;

const resend = (data: ResendData) => api.post('/auth/resend', data);

export default function useResendVerificationCode() {
  return useMutation({
        mutationFn: resend,
  });
}
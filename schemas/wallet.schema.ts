
import { z } from 'zod';

export const WalletSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Wallet name is required')
    .max(50, 'Wallet name must not exceed 50 characters'),

  type: z.string().min(1, "Select wallet Type"),

  balance: z
    .number()
    .min(0, 'Balance cannot be negative')
    .optional(),
});

export type WalletFormData = z.infer<typeof WalletSchema>;
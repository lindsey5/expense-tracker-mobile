import { z } from 'zod';

export const CreateTransactionSchema = z.object({
    walletId: z
        .string()
        .min(1, 'Select a wallet'),

    type: z
        .string()
        .min(1, 'Select transaction type'),

    category: z
        .string()
        .min(1, 'Select transaction category'),

    amount: z
        .number()
        .positive('Amount must be greater than 0'),

    title: z
        .string()
        .trim()
        .min(1, 'Transaction title is required')
        .max(100, 'Transaction title must not exceed 100 characters'),

    date: z
        .date({ message: 'Transaction date is required' }),
});

export type TransactionFormData = z.infer<
  typeof CreateTransactionSchema
>;
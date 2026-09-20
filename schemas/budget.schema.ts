import { z } from 'zod';

export const CreateBudgetSchema = z.object({

    category: z
        .string()
        .min(1, 'Select category category'),

    amount: z
        .number()
        .positive('Amount must be greater than 0'),
});

export type CreateBudgetFormData = z.infer<
  typeof CreateBudgetSchema
>;
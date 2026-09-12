import { TransactionCategories } from "@/constants/transaction";
import { schemas } from "@/lib/api/openapi";
import z from "zod";

export type TransactionCategory = typeof TransactionCategories[number];

export type Transaction = z.infer<typeof schemas.TransactionResponseDto>;
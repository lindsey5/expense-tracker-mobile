import { schemas } from "@/lib/api/openapi";
import z from "zod";

export const TransactionCategory = [
    "FOOD",
    "TRANSPORTATION",
    "BILLS",
    "SHOPPING",
    "ENTERTAINMENT",
    "HEALTHCARE",
    "EDUCATION",
    "TRAVEL",
    "HOUSING",
    "PERSONAL_CARE",
    "SUBSCRIPTIONS",
    "GROCERIES",
    "GIFTS_DONATIONS",
    "INSURANCE",
    "SALARY",
    "BUSINESS",
    "FREELANCE",
    "INVESTMENT",
    "ALLOWANCE",
    "GIFT",
    "BONUS",
    "OTHER",
] as const

export type TransactionCategory = typeof TransactionCategory[number];

export type Transaction = z.infer<typeof schemas.TransactionResponseDto>;
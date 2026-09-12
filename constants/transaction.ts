import { schemas } from "@/lib/api/openapi";
import z from "zod";

export const ExpenseCategories = [
  'FOOD',
  'TRANSPORTATION',
  'BILLS',
  'SHOPPING',
  'ENTERTAINMENT',
  'HEALTHCARE',
  'EDUCATION',
  'TRAVEL',
  'HOUSING',
  'PERSONAL_CARE',
  'SUBSCRIPTIONS',
  'GROCERIES',
  'GIFTS_DONATIONS',
  'INSURANCE',
  'OTHER',
] as const;

export const IncomeCategories = [
  'SALARY',
  'BUSINESS',
  'FREELANCE',
  'INVESTMENT',
  'ALLOWANCE',
  'GIFT',
  'BONUS',
  'OTHER',
] as const;

export const TransactionCategories = [
  ...ExpenseCategories.filter((category) => category !== 'OTHER'),
  ...IncomeCategories.filter((category) => category !== 'OTHER'),
  'OTHER',
] as const;
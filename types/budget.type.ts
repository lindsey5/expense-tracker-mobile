import { GetBudgetsResponse } from "@/hooks/budget/use-get-budgets.hook";

export type Budget = GetBudgetsResponse['budgets'][number];
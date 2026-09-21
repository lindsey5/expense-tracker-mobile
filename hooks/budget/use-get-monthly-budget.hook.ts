import { api } from '@/lib/api';
import { schemas } from '@/lib/api/openapi';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';
import type { ZodiosQueryParamsByAlias } from '@zodios/core';

import { ApiType } from '@/types/api.type';
import useRemoveQueryCache from '../use-remove-query-cache';

export type GetMonthlyBudgetsQueryParams = ZodiosQueryParamsByAlias<
  ApiType,
  'monthly_budget'
>;

export type GetMonthlyBudgetsResponse = z.infer<
  typeof schemas.GetMonthlyBudgetResponse
>;

const getMonthlyBudgets = (queries: GetMonthlyBudgetsQueryParams) => api.get('/budget/monthly-budget', { queries });

export default function useGetMonthlyBudgets(
  params: GetMonthlyBudgetsQueryParams,
) {
  const apiParams: GetMonthlyBudgetsQueryParams = {

    month:
      params.month !== undefined
        ? Number(params.month)
        : new Date().getMonth() + 1,

    year:
      params.year !== undefined
        ? Number(params.year)
        : new Date().getFullYear(),
  };

  useRemoveQueryCache(['monthly-budgets', apiParams]);

  return useQuery<GetMonthlyBudgetsResponse>({
    queryKey: ['monthly-budgets', apiParams],
    queryFn: () => getMonthlyBudgets(apiParams),
    refetchOnWindowFocus: false,
  });
}
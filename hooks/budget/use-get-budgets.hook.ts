import { api } from '@/lib/api';
import { schemas } from '@/lib/api/openapi';
import { useQuery } from '@tanstack/react-query';
import z from 'zod';
import type { ZodiosQueryParamsByAlias } from '@zodios/core';

import { ApiType } from '@/types/api.type';
import useRemoveQueryCache from '../use-remove-query-cache';

export type GetBudgetsQueryParams = ZodiosQueryParamsByAlias<
  ApiType,
  'list_budgets'
>;

export type GetBudgetsResponse = z.infer<
  typeof schemas.GetBudgetsResponse
>;

const getBudgets = (queries: GetBudgetsQueryParams) =>
  api.list_budgets({ queries });

export default function useGetBudgets(
  params: GetBudgetsQueryParams,
) {
  const apiParams: GetBudgetsQueryParams = {
    status:
      params.status !== undefined
        ? params.status
        : undefined,

    month:
      params.month !== undefined
        ? Number(params.month)
        : new Date().getMonth() + 1,

    year:
      params.year !== undefined
        ? Number(params.year)
        : new Date().getFullYear(),
  };

  useRemoveQueryCache(['budgets', apiParams]);

  return useQuery<GetBudgetsResponse>({
    queryKey: ['budgets', apiParams],
    queryFn: () => getBudgets(apiParams),
    refetchOnWindowFocus: false,
  });
}